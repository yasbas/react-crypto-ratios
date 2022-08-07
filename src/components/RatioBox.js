import React from 'react'

const RatioBox = ({base, quote}) => {
    // const getData = fetch('https://jsonplaceholder.typicode.com/todos/')
    //     .then(response => response.json())
    //     //.then(json => console.log(json));

    const onBtnGet = () => {
        //console.log(getData.getResult()[0])
        //const getData = fetch('https://jsonplaceholder.typicode.com/todos/')
        const getData = fetch('https://www.binance.com/api/v1/ticker/allPrices')
        .then(response => response.json())
        //.then(json => console.log(json))
        .then(json => json.filter(pair => 
            // pair.symbol.endsWith('USDТ') && 
            // !pair.symbol.includes('UP') &&
            // !pair.symbol.includes('DOWN') &&
            // !pair.symbol.includes('BULL') &&
            // !pair.symbol.includes('BEAR')
            // pair.symbol == 'MATICBUSD' ||
            // pair.symbol == 'XRPBUSD'
            pair.symbol == base+'BUSD' ||
            pair.symbol == quote+'BUSD'
        ))
        .then(basequote => {
            console.log(basequote)
            const quoteVal = basequote.filter(pair => pair.symbol == quote+'BUSD')[0]
            const baseVal = basequote.filter(pair => pair.symbol == base+'BUSD')[0]
            const ratio = (parseFloat(baseVal.price) / parseFloat(quoteVal.price)).toFixed(4)
            const ratioDisplay = document.getElementById('ratioDisplay'+base+quote)
            
            ratioDisplay.innerText = ratio

            const prices = document.getElementById('prices'+base+quote)
            prices.innerText =
                '('+parseFloat(baseVal.price).toFixed(4)+
                ' / '+parseFloat(quoteVal.price).toFixed(4)+
                ')'
        })
    }
    return (
        <div className='ratioBox'>
            <p>{base} / {quote} <span id={'prices'+base+quote}></span></p>
            <p id={'ratioDisplay'+base+quote}></p>
            <button onClick={onBtnGet}>Get</button>
        </div>
    )
}

export default RatioBox
