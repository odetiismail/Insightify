import React, { useEffect, useState } from "react";
import { db } from "../Firebase-config";
import { collection, getDocs, doc, updateDoc } from "@firebase/firestore";
import pendingIcon from "../images/Prop=Light.png";
import timeIcon from "../images/varient=Light.png";
import tableIcon from "../images/Property1=Light.png";
import { TimeConvert } from "./TimeConvert";
import { Link } from "react-router-dom";

export const SeeMore = () => {
  const [users, setUsers] = useState([]);
  // const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [showOrders, setShowOrders] = useState(-1);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ORDERS"));
        const userData = querySnapshot.docs.map((doc) =>
          // console.log(doc._document.data.value.mapValue.fields)
          ({
            id: doc.id,
            amount: doc.amount,
            customerName: doc.customerName,
            orderAcceptedTime: doc.orderAcceptedTime,
            orderFinishedTime: doc.orderFinishedTime,
            orderID: doc.orderID,
            orderRejectReason: doc.orderRejectReason,
            orderStatus: doc.orderStatus,
            orderTime: doc.orderTime,
            orders: doc.orders,
            tableNumber: doc.tableNumber,
            ...doc.data(),
          })
        );
        setUsers(userData.filter((item) => item.orderStatus === "PENDING"));
      } catch (error) {
        setError("Error fetching users");
      }
    };
    getUsersData();
  }, []);

  const updateOrder = async (id, status, Timestamp) => {
    const orderDoc = doc(db, "ORDERS", id);
    const orderStatus = { orderStatus: status, orderAcceptedTime: Timestamp };
    console.log("Updated the Data on System");
    await updateDoc(orderDoc, orderStatus);
    console.log("Updated the Data on the Server");
    window.location.reload(false);
  }

  const rejectOrder = async (id, status) => {
    let orderRejectReason = prompt("Enter a reason for rejection");
    while(orderRejectReason === ""){
      orderRejectReason = prompt("Please  enter a valid reason!");
    }
    if(orderRejectReason !== null){
      const orderDoc = doc(db, "ORDERS", id);
      const orderStatus = { orderStatus: status, orderRejectReason: orderRejectReason };
      console.log("Updated the Data on System");
      await updateDoc(orderDoc, orderStatus);
      console.log("Updated the Data on the Server");
      window.location.reload(false);
    }
    else{
      alert("Rejection cancelled");
    }
  }

  return (
    <>
      <h1 id="orderhead">Pending Orders</h1>
      <div className="orders">
      <div className="pendingdiv">
          <div className="d-flex">
            <p id="pending">
              {" "}
              <img src={pendingIcon} alt="Pending Icon" width="40px" /> Pending
            </p>
          </div>
        </div>

      <div className="order1">
            <p>
              Tap on the order to see, Order details and information about the
              order.
            </p>
          </div>
        <div className="ordershistory mt-3">
        {users.length > 0 ? (
            users.map((item, index) => (
              <div
                className="order2"
                key={index}
                onClick={() => {
                  setShowOrders(prevIndex => {
                    if (prevIndex === index) {
                      return -1;
                    } else {
                      return index;
                    }
                  });
                }}
              >
                <div className="order2Main">
                  <div>
                    <h5>
                      <b>{item.customerName}</b>
                    </h5>
                    <p>{item.orderID}</p>
                  </div>
                  <div style={{ color: "#B3261E" }}>
                    <h4>
                      <b>${item.amount.Dollars}</b>
                    </h4>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ padding: "10px 20px 10px 20px" }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#000000",
                    }}
                  >
                    <img src={timeIcon} alt="Time Icon" width="40px" />
                    {
                      <TimeConvert
                        seconds={item.orderTime.seconds}
                        nanoseconds={item.orderTime.nanoseconds}
                      />
                    }
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#000000",
                    }}
                  >
                    <img src={tableIcon} alt="Table Icon" width="40px" /> Table
                    - {item.tableNumber}
                  </div>
                </div>
                {/*  */}

                <div
                  className="Parent"
                  style={
                    index === showOrders
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  {item.orders.soups !== null ? (
                    <>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          lineHeight: "27px",
                        }}
                      >
                        Soups{" "}
                      </p>
                      <ol>
                        {item.orders.soups.map((item1, index1) => (
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
                        ))}
                      </ol>
                    </>
                  ) : null}
                  {item.orders.appetizers !== null ? (
                    <>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          lineHeight: "27px",
                        }}
                      >
                        Appetizers{" "}
                      </p>
                      <ol>
                        {item.orders.appetizers.map((item1, index1) => (
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
                        ))}
                      </ol>
                    </>
                  ) : null}
                  {item.orders.main !== null ? (
                    <>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          lineHeight: "27px",
                        }}
                      >
                        Main Course{" "}
                      </p>
                      <ol>
                        {item.orders.main.map((item1, index1) => (
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
                        ))}
                      </ol>
                    </>
                  ) : null}
                  {item.orders.beverages !== null ? (
                    <>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          lineHeight: "27px",
                        }}
                      >
                        Beverages{" "}
                      </p>
                      <ol>
                        {item.orders.beverages.map((item1, index1) => (
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
                        ))}
                      </ol>
                    </>
                  ) : null}
                  {item.orders.desert !== null ? (
                    <>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          lineHeight: "27px",
                        }}
                      >
                        Desert{" "}
                      </p>
                      <ol>
                        {item.orders.desert.map((item1, index1) => (
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
                        ))}
                      </ol>
                    </>
                  ) : null}
                </div>

                {/*  */}

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      height: "60px",
                    }}
                  >
                    <button
                      className="chefFinishBtn"
                      onClick={() => {
                        rejectOrder(item.id,"REJECTED");
                      }}
                    >
                      Reject order
                    </button>
                    <button
                      className="chefAccepthBtn"
                      onClick={() => {
                        updateOrder(item.id,"ACCEPTED",new Date());
                      }}
                    >
                      Accept order
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h5 className="text-center p-2"><b>No orders</b></h5>
          )}
        </div>
      </div>
    </>
  );
};
