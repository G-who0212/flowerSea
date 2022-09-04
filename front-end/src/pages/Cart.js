import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import axios from 'axios';
import { getCookieToken } from "../storage/Cookie";


export default function Cart() {
  // const domain = "http://192.168.35.205:8000/";
  const domain = "http://127.0.0.1:8000/";

  const [carts, setCarts] = useState(null);
  var [main1, setMain1s] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const flo = [];
  
  const fetchCarts = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setCarts(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      
      const response = await axios.get(domain + "api/cart/");
      setCarts(response.data); // 데이터는 response.data 안에 들어있습니다.
      setMain1s(response.data.mainFlower1_amount);
      console.log(response.data);
      
      flo[0] = response.data.mainFlower1_amount;
      flo[1] = response.data.mainFlower2_amount;
      flo[2] = response.data.mainFlower3_amount;
      flo[3] = response.data.subFlower1_amount;
      flo[4] = response.data.subFlower2_amount;
      flo[5] = response.data.subFlower3_amount;
      flo[6] = response.data.bunchOfFlowers1_amount;
      flo[7] = response.data.bunchOfFlowers2_amount;
      
      // shop 정보 찾기 위한 과정
      let shops = await axios.get(domain + 'api/flowershop/');
      shops = JSON.stringify(shops.data);
      const shop = JSON.parse(shops).filter(function(element){
        return element.shopName === response.data.shopname;
      }); 
      console.log("shopis", shop[0].idx);
      
      console.log("fetchCarts 완료!");
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  const [number, dispatch] = useReducer(reducer, carts);
  // async function getmain1() {
  //   const response = await axios.get(domain + "api/cart/");
  //   setMain1s(response.data.mainFlower1_amount);
  //   console.log("main1 is", main1);
  //   console.log("mainflower1 is", response.data.mainFlower1_amount);
  // }
  // const [number, dispatch] = useReducer(reducer, carts);
  // const [number, dispatch] = useReducer(reducer, 0);
  // const dispatch = useDispatch();
  // const main1 = useSelector((state) => state.mainFlower1_amount);
  function reducer(state, action) {
    switch (action.type) {
      case "INCREMENT1":
        carts.mainFlower1_amount++;
        carts.totalPrice += carts.mainFlower1_price;
        setCarts(carts);
        return carts.mainFlower1_amount;
      case "INCREMENT2":
        carts.mainFlower2_amount++;
        carts.totalPrice += carts.mainFlower2_price;
        setCarts(carts);
        return carts.mainFlower2_amount;
      case "INCREMENT3":
        carts.mainFlower3_amount++;
        carts.totalPrice += carts.mainFlower3_price;
        setCarts(carts);
        return carts.mainFlower3_amount;
      case "INCREMENT4":
        carts.subFlower1_amount++;
        carts.totalPrice += carts.subFlower1_price;
        setCarts(carts);
        return carts.subFlower1_amount;
      case "INCREMENT5":
        carts.subFlower2_amount++;
        carts.totalPrice += carts.subFlower2_price;
        setCarts(carts);
        return carts.subFlower2_amount;
      case "INCREMENT6":
        carts.subFlower3_amount++;
        carts.totalPrice += carts.subFlower3_price;
        setCarts(carts);
        return carts.subFlower3_amount;
      case "INCREMENT7":
        carts.bunchOfFlowers1_amount++;
        carts.totalPrice += carts.bunchOfFlowers1_price;
        setCarts(carts);
        return carts.bunchOfFlowers1_amount;
      case "INCREMENT8":
        carts.bunchOfFlowers2_amount++;
        carts.totalPrice += carts.bunchOfFlowers2_price;
        setCarts(carts);
        return carts.bunchOfFlowers2_amount;
      case "DECREMENT1": // mainflower
        carts.mainFlower1_amount--;
        carts.totalPrice -= carts.mainFlower1_price;
        setCarts(carts);
        return carts.mainFlower1_amount;
      case "DECREMENT2":
        carts.mainFlower2_amount--;
        carts.totalPrice -= carts.mainFlower2_price;
        setCarts(carts);
        return carts.mainFlower2_amount;
      case "DECREMENT3":
        carts.mainFlower3_amount--;
        carts.totalPrice -= carts.mainFlower3_price;
        setCarts(carts);
        return carts.mainFlower3_amount;
      case "DECREMENT4": // subflower
        carts.subFlower1_amount--;
        carts.totalPrice -= carts.subFlower1_price;
        setCarts(carts);
        return carts.subFlower1_amount;
      case "DECREMENT5":
        carts.subFlower2_amount--;
        carts.totalPrice -= carts.subFlower2_price;
        setCarts(carts);
        return carts.subFlower2_amount;
      case "DECREMENT6":
        carts.subFlower3_amount--;
        carts.totalPrice -= carts.subFlower3_price;
        setCarts(carts);
        return carts.subFlower3_amount;
      case "DECREMENT7":
        carts.bunchOfFlowers1_amount--;
        carts.totalPrice -= carts.bunchOfFlowers1_price;
        setCarts(carts);
        return carts.bunchOfFlowers1_amount;
      case "DECREMENT8":
        carts.bunchOfFlowers2_amount--;
        carts.totalPrice -= carts.bunchOfFlowers2_price;
        setCarts(carts);
        return carts.bunchOfFlowers2_amount;
      default:
        return carts.mainFlower1_amount;
    }
  }
  const onIncrease = (e) => {
    e.preventDefault();
    // const response = await axios.get(domain + "api/cart/");
    // const [ca, dispatch] = useReducer(reducer, response.data.mainFlower1_amount);
    dispatch({ type: "INCREMENT"});
  };
  const onDecrease = (e) => {
    e.preventDefault();
    dispatch({ type: "DECREMENT" });
  };
  
  const onSubmit = async () => {
		try {
			const res = await axios.post(domain + "api/cart/", carts);
      console.log("----------- submit ------------ ");
      console.log(res.data);
      // return navigate("/");
		} catch (err) {
			console.log(err)
		}
	}

  useEffect(() => {
    console.log("fetchcart  전");
    fetchCarts();
  }, []);

  if (loading) return <div>로딩중..</div>; 
  if (error) return <div>에러가 발생했습니다</div>;

	// 아직 users가 받아와 지지 않았을 때는 아무것도 표시되지 않도록 해줍니다.
  if (!carts) return <div>cart가 없어요~~~!</div>;

	  return (
		<form name="orderform" id="orderform" className="orderform" onSubmit="return false;"> 
    {/* // onsubmit="return false;" */}
		
				<input type="hidden" name="cmd" value="order" />
				<div className="border-b-2 border-solid mx-2" id="basket">
          <div className="flex flex-row border-b-2 mb-16 mt-8">
            <div className="ml-8"><img src="./images/icon_cart_color.png" width="60" /></div>
            <div className="f text-3xl pt-6 ml-2">장바구니</div>
            {/* <div className="f text-3xl pt-24 ml-2">장바구니</div> */}
          </div>
          <div className="flex flex-row">
					  <h1 className="f text-2xl px-4 m-4 border-b-4 ">{carts.shopname}</h1>
            <button className="f px-4 p-4 my-4 ml-2 rounded-l-lg bg-gray-300 ">배달</button>
            <button className="f px-4 p-4 my-4 ml-2 rounded-r-lg bg-cyan-200">픽업</button>
          </div>
          <div>
          {
            carts.mainFlower1_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.mainFlower1_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.mainFlower1_price}</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                        onClick={function(e){
                          e.preventDefault();
                          dispatch({ type: "DECREMENT1"});
                        }}
                        // onClick={onDecrease}
                          >-</button>
                      {/* <div className="pt-2 mx-4 grow">{carts.mainFlower1_amount}</div> */}
                      {/* <div className="pt-2 mx-4 grow">{main1}</div> */}
                      {/* <div className="pt-2 mx-4 grow">{number}</div> */}
                      <div className="pt-2 mx-4 grow">{carts.mainFlower1_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                        onClick={function(e){
                          e.preventDefault();
                          dispatch({ type: "INCREMENT1"});
                        }}
                      // onClick={onIncrease}                        
                      >+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.mainFlower1_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.mainFlower1_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.mainFlower1_price * carts.mainFlower1_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.mainFlower2_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.mainFlower2_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.mainFlower2_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                    <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                        onClick={function(e){
                          e.preventDefault();
                          dispatch({ type: "DECREMENT2"});
                        }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.mainFlower2_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT2"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.mainFlower2_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.mainFlower2_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.mainFlower2_price * carts.mainFlower2_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.mainFlower3_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.mainFlower3_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.mainFlower3_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT3"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.mainFlower3_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT3"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.mainFlower3_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.mainFlower3_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.mainFlower3_price*carts.mainFlower3_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.subFlower1_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.subFlower1_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.subFlower1_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT4"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.subFlower1_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT4"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.subFlower1_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.subFlower1_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.subFlower1_price*carts.subFlower1_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.subFlower2_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.subFlower2_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.subFlower2_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT5"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.subFlower2_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT5"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.subFlower2_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.subFlower2_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.subFlower2_price*carts.subFlower2_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.subFlower3_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.subFlower3_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.subFlower3_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT6"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.subFlower3_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT6"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.subFlower3_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.subFlower3_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.subFlower3_price*carts.subFlower3_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.bunchOfFlowers1_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.bunchOfFlower1_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.bunchOfFlowers1_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT7"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.bunchOfFlowers1_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT7"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.bunchOfFlowers1_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.bunchOfFlowers1_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.bunchOfFlowers1_price*carts.bunchOfFlowers1_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.bunchOfFlowers2_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.bunchOfFlower2_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.bunchOfFlowers2_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT8"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.bunchOfFlowers2_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT8"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.bunchOfFlowers2_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.bunchOfFlowers2_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.bunchOfFlowers2_price*carts.bunchOfFlowers2_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          </div>	
				</div>
        <div className="flex flex-row-reverse">
          <div className="mr-2 mt-2 bigtext right-align box summoney">{carts.totalPrice}원</div>
          <div className="mr-2 mt-2 bigtext right-align box summoney">합계 : </div>
        </div>
		
				<div id="goorder" className="">
					<div className="clear"></div>
					<div className="buttongroup center-align">
          <Link to='/'>
						<button className="button w-40 px-8 py-4 border-2 border-blue-300 rounded-md"
            type='submit' onClick={onSubmit}>주문하기</button>
          </Link>
					</div>
				</div>
			</form>
	  )
	}