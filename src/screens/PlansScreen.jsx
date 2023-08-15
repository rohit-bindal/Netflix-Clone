import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import {
  collection,
  query,
  getDocs,
  doc,
  addDoc,
  getDoc,
  orderBy,
} from "firebase/firestore/lite";
import { db } from "../services/firebaseConfigs";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import PreLoader from "../components/PreLoader";

function PlansScreen() {
  const [showPreLoader, setShowPreLoader] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "customers", user.uid);
      const collQuery = query(collection(docRef, "subscriptions"));
      const querySnapshot = await getDocs(collQuery);
      querySnapshot.forEach(async (subDoc) => {
        setSubscription({
          role: subDoc.data().role,
          current_period_end: subDoc.data().current_period_end.seconds,
          current_period_start: subDoc.data().current_period_end.seconds,
        });
      });
    };
    fetchData();
  }, [user.uid]);

  useEffect(() => {
    setShowPreLoader(true);
    const activeProductsQuery = query(
      collection(db, "products"),
      orderBy("timestamp")
    );

    getDocs(activeProductsQuery).then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnapQuery = query(collection(productDoc.ref, "prices"));
        const priceSnapshot = await getDocs(priceSnapQuery);
        priceSnapshot.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
      setShowPreLoader(false);
    });
  }, []);

  const loadCheckout = async (priceId) => {
    try {
      setShowPreLoader(true);
      const docRef = doc(db, "customers", user.uid);
      const collRef = collection(docRef, "checkout_sessions");
      await addDoc(collRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
      const d = await getDocs(query(collRef));
      let sessionId = '';
      d.forEach(async (doc)=>{
        const data = doc.data();
        if(data.price === priceId && data.sessionId){
          sessionId=data.sessionId;
        }
      }
        );
      if (sessionId) {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripe.redirectToCheckout({ sessionId });
      }
      setShowPreLoader(false);
    } catch (error) {
      alert(`${error.message}`);
      setShowPreLoader(false);
    }
  };

  return (
    <>
      {showPreLoader ? (
        <div className="planScreen__preLoader">
          <PreLoader />
        </div>
      ) : (
        <div className="plansScreen">
          {subscription && (
            <p className="plansScreen__renewalDate">
              Renewal Date:{" "}
              {new Date(
                subscription?.current_period_end * 1000
              ).toLocaleDateString()}
            </p>
          )}
          {Object.entries(products).map(([productId, productData]) => {
            const isCurrentSubscription = productData.name
              ?.toLowerCase()
              .includes(subscription?.role);

            return (
              <div
                key={productId}
                className={`${
                  isCurrentSubscription && "plansScreen__plan--disabled"
                } plansScreen__plan`}
              >
                <div className="plansScreen__info">
                  <h5>{productData.name}</h5>
                  <h6>{productData.description}</h6>
                </div>
                <button
                  onClick={() => {
                    !isCurrentSubscription &&
                      loadCheckout(productData?.prices?.priceId);
                  }}
                >
                  {isCurrentSubscription ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default PlansScreen;
