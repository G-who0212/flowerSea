import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';

export default function Cart() {
  // let basket = {
	// 	totalCount: 0, 
	// 	totalPrice: 0,
	// 	//화면 업데이트
	// 	updateUI: function () {
	// 		document.querySelector('#sum_p_num').textContent = '상품갯수: ' + this.totalCount.formatNumber() + '개';
	// 		document.querySelector('#sum_p_price').textContent = '합계금액: ' + this.totalPrice.formatNumber() + '원';
	// 	},
	// 	//개별 수량 변경
	// 	// changePNum: function (pos) {
	// 	//     var item = document.querySelector('input[name=p_num'+pos+']');
	// 	//     var p_num = parseInt(item.getAttribute('value'));
	// 	//     var newval = event.target.classList.contains('up') ? p_num+1 : event.target.classList.contains('down') ? p_num-1 : event.target.value;
			
	// 	//     if (parseInt(newval) < 1 || parseInt(newval) > 99) { return false; }
	
	// 	//     item.setAttribute('value', newval);
	// 	//     item.value = newval;
	
	// 	//     var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
	// 	//     item.parentElement.parentElement.nextElementSibling.textContent = (newval * price).formatNumber()+"원";
	// 	//     //AJAX 업데이트 전송
	
	// 	//     //전송 처리 결과가 성공이면    
	// 	//     this.reCalc();
	// 	//     this.updateUI();
	// 	// },
	// 	checkItem: function () {
	// 		this.reCalc();
	// 		this.updateUI();
	// 	},
	// 	// delItem: function () {
	// 	//     event.target.parentElement.parentElement.parentElement.remove();
	// 	//     this.reCalc();
	// 	//     this.updateUI();
	// 	// }
	// }
	
	// 	// 숫자 3자리 콤마찍기
	// 	Number.prototype.formatNumber = function(){
	// 		if(this==0) return 0;
	// 		let regex = /(^[+-]?\d+)(\d{3})/;
	// 		let nstr = (this + '');
	// 		while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
	// 		return nstr;
	// 	};
  // const domain = "http://192.168.35.205:8000/";
  const domain = "http://127.0.0.1:8000/";
  var flowerid= "anything";

  const getData = async () => {
		// try {
			const res = await axios.get(domain + "api/flowershop/");
			let cart = res.data;
			// console.log(cart);
      let fsname = cart[32].shopName;
      console.log(fsname)
      return fsname;
		// } catch (err) {
		// 	console.log("error");
		// }
	};
  
  console.log(getData());
	// const flowerid = getData();
  

	  return (
		<form name="orderform" id="orderform" method="post" class="orderform" action="/Page" onsubmit="return false;">
		
				<input type="hidden" name="cmd" value="order" />
				<div class="border-b-2 border-solid mx-2" id="basket">
          <div class="flex flex-row border-b-2 mb-16 mt-8">
            <div class="ml-8"><img src="./images/icon_cart_color.png" width="60" /></div>
            <div class="f text-3xl pt-6 ml-2">장바구니</div>
          </div>
          <div class="flex flex-row">
					  <h1 class="f text-2xl px-4 m-4 border-b-4 ">홍익꽃집</h1>
            <button class="f px-4 p-4 my-4 ml-2 rounded-l-lg bg-gray-300 ">배달</button>
            <button class="f px-4 p-4 my-4 ml-2 rounded-r-lg bg-cyan-200">픽업</button>
          </div>
			
          <div class="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
            <div class="m-4 py-4"><img src="./images/rose.jpeg" width="200" /></div>
            <div class="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
              <div class="font-bold text-base p-1">품목</div>
              <div class="p-2">{flowerid}</div>
              <div class="flex flex-row">
                <div class="w-16">8000원</div>
                <div class="w-4 ">/</div>
                <div class="w-12 ">1송이</div>
              </div>
            </div>
            <div class="flex flex-row-reverse w-full">
              <div class="flex flex-col m-2 justify-center text-center">
                <div class="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                  <button class="rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">-</button>
                  <div class="pt-2 mx-4">수량</div>
                  <button class="rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl">+</button>
                </div>
                <div class="flex flex-row my-2 border-b-2 border-solid">
                  <div class="m-2 text-neutral-400">8000원</div>
                  <div class="m-2 text-neutral-400">X</div>
                  <div class="m-2 text-neutral-400">2</div>
                </div>
                <div class="text-blue-300">16000원</div>
              </div>
            </div>
					</div>	
				</div>
        <div class="flex flex-row-reverse">
          <div class="mr-2 mt-2 bigtext right-align box summoney">76,000원</div>
          <div class="mr-2 mt-2 bigtext right-align box summoney">합계 : </div>
        </div>
		
				<div id="goorder" class="">
					<div class="clear"></div>
					<div class="buttongroup  center-align">
						<button class="button w-40 px-8 py-4">주문하기</button>
					</div>
				</div>
			</form>
	  )
	}
	