import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';

export default function Cart() {
  // const domain = "http://192.168.35.205:8000/";
  const domain = "http://127.0.0.1:8000/";

  const [carts, setCarts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCarts = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setCarts(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(domain + "api/cart/all/");
      setCarts(response.data); // 데이터는 response.data 안에 들어있습니다.
      console.log(response.data)
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchCarts();
  }, []);

  if (loading) return <div>로딩중..</div>; 
  if (error) return <div>에러가 발생했습니다</div>;

	// 아직 users가 받아와 지지 않았을 때는 아무것도 표시되지 않도록 해줍니다.
  if (!carts) return null;

	  return (
		<form name="orderform" id="orderform" method="post" className="orderform" action="/Page" onsubmit="return false;">
		
				<input type="hidden" name="cmd" value="order" />
				<div className="border-b-2 border-solid mx-2" id="basket">
          <div className="flex flex-row border-b-2 mb-16 mt-8">
            <div className="ml-8"><img src="./images/icon_cart_color.png" width="60" /></div>
            <div className="f text-3xl pt-6 ml-2">장바구니</div>
          </div>
          <div className="flex flex-row">
					  <h1 className="f text-2xl px-4 m-4 border-b-4 ">홍익꽃집</h1>
            <button className="f px-4 p-4 my-4 ml-2 rounded-l-lg bg-gray-300 ">배달</button>
            <button className="f px-4 p-4 my-4 ml-2 rounded-r-lg bg-cyan-200">픽업</button>
          </div>
  
          <div>
          {
            carts[0].mainFlower1_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts[0].mainFlower1_ID}</div>
                  <div className="flex flex-row">
                    <div className="w-16">8000원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">-</button>
                      <div className="pt-2 mx-4 grow">{carts[0].mainFlower1_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">8000원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts[0].mainFlower1_amount}</div>
                    </div>
                    <div className="text-blue-300">16000원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts[0].mainFlower2_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts[0].mainFlower2_ID}</div>
                  <div className="flex flex-row">
                    <div className="w-16">8000원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">-</button>
                      <div className="pt-2 mx-4 grow">{carts[0].mainFlower2_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">8000원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts[0].mainFlower2_amount}</div>
                    </div>
                    <div className="text-blue-300">16000원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts[0].mainFlower3_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts[0].mainFlower3_ID}</div>
                  <div className="flex flex-row">
                    <div className="w-16">8000원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">-</button>
                      <div className="pt-2 mx-4 grow">{carts[0].mainFlower3_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">8000원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts[0].mainFlower3_amount}</div>
                    </div>
                    <div className="text-blue-300">16000원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts[0].subFlower1_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts[0].subFlower1_ID}</div>
                  <div className="flex flex-row">
                    <div className="w-16">8000원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">-</button>
                      <div className="pt-2 mx-4 grow">{carts[0].subFlower1_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">8000원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts[0].subFlower1_amount}</div>
                    </div>
                    <div className="text-blue-300">16000원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts[0].subFlower2_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts[0].subFlower2_ID}</div>
                  <div className="flex flex-row">
                    <div className="w-16">8000원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">-</button>
                      <div className="pt-2 mx-4 grow">{carts[0].subFlower2_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">8000원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts[0].subFlower2_amount}</div>
                    </div>
                    <div className="text-blue-300">16000원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts[0].subFlower3_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts[0].subFlower3_ID}</div>
                  <div className="flex flex-row">
                    <div className="w-16">8000원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">-</button>
                      <div className="pt-2 mx-4 grow">{carts[0].subFlower3_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">8000원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts[0].subFlower3_amount}</div>
                    </div>
                    <div className="text-blue-300">16000원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts[0].bunchOfFlowers1_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts[0].bunchOfFlowers1_ID}</div>
                  <div className="flex flex-row">
                    <div className="w-16">8000원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">-</button>
                      <div className="pt-2 mx-4 grow">{carts[0].bunchOfFlowers1_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">8000원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts[0].bunchOfFlowers1_amount}</div>
                    </div>
                    <div className="text-blue-300">16000원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts[0].bunchOfFlowers2_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts[0].mainFlower1_ID}</div>
                  <div className="flex flex-row">
                    <div className="w-16">8000원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">-</button>
                      <div className="pt-2 mx-4 grow">{carts[0].bunchOfFlowers2_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">8000원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts[0].bunchOfFlowers2_amount}</div>
                    </div>
                    <div className="text-blue-300">16000원</div>
                  </div>
                </div>
              </div>
            : null
          }
          </div>	
				</div>
        <div className="flex flex-row-reverse">
          <div className="mr-2 mt-2 bigtext right-align box summoney">{carts[0].totalPrice}원</div>
          <div className="mr-2 mt-2 bigtext right-align box summoney">합계 : </div>
        </div>
		
				<div id="goorder" className="">
					<div className="clear"></div>
					<div className="buttongroup  center-align">
						<button className="button w-40 px-8 py-4">주문하기</button>
					</div>
				</div>
			</form>
	  )
	}
	