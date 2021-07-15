import { VercelRequest, VercelResponse } from "@vercel/node";
import { return200, return500 } from "../utils/response";
import  axios  from 'axios';
import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../utils";
interface ReturnShape {
  [tokenIds: string]: {
    price: string;
    base_volume: string;
    quote_volume: string;
    liquidity: string;
    liquidity_BNB: string;
  };
}
export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    axios.get('https://cashcow-frontend.vercel.app/api/pairs')
  .then(result => {

    let total_liq_bnb=0;
    let allPairsData = result.data.data;
    let filterdata=[];
    let amount:any =0;
  for(var key in allPairsData){
    var keyjson = allPairsData[key];
    filterdata.push(keyjson)
  }
  console.log("data" , filterdata)
  for(let i=0; i<filterdata.length; i++){
    amount = filterdata[i].liquidity_BNB;
    total_liq_bnb += JSON.parse( amount)
  }
  let total_value_locked= total_liq_bnb * 304.46;
  
    return200(res,
       { 
          "msg"                 : "tvl api is working" , 
          "total_liquidity_BNB" : total_liq_bnb ,  
          "bnd_price"           : "304.46",
          "tvl"                 : total_value_locked,
        });
  })
  } catch (error) {
    return500(res, error);
  }
}


// const axios = require('axios');
// import  axios  from 'axios';

//  test(){  
//   axios.get('https://cashcow-frontend.vercel.app/api/pairs')
//   .then(res => {
//     console.log('Status Code:', res.data);
//   })
//   .catch(err => {
//     console.log('Error: ', err.message);
//   });
// }
// test();
