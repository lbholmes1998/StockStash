import fetchStockData from '../api/fetchStockData'

// Basic component to display stock information
export default async function StockInfo(props: {ticker: string}) {

    const ticker = props.ticker
    const stockData = await fetchStockData(ticker)

    return (
        <>
            <div>
                <h2>Stock Data for {ticker}</h2>
                <p>Revenue: {stockData[ticker].revenue.value}</p>
                <p>Revenue Y/Y Change: {stockData[ticker].revenue['y/y_change']}</p>
                <p>Cash from Financing: {stockData[ticker].cash_from_financing.value}</p>
                <p>Cash from Financing Y/Y Change: {stockData[ticker].cash_from_financing['y/y_change']}</p>
                <p>Cash from Operations: {stockData[ticker].cash_from_operations.value}</p>
                <p>Cash from Operations Y/Y Change: {stockData[ticker].cash_from_operations['y/y_change']}</p>
                <p>Earnings per Share: {stockData[ticker].eps.value}</p>
                <p>Earnings per Share Y/Y Change: {stockData[ticker].eps['y/y_change']}</p>
                <p>Net Income: {stockData[ticker].net_income.value}</p>
                <p>Net Income Y/Y Change: {stockData[ticker].net_income['y/y_change']}</p>
                <p>Total Assets: {stockData[ticker].total_assets.value}</p>
                <p>Total Assets Y/Y Change: {stockData[ticker].total_assets['y/y_change']}</p>
                <p>Total Liabilities: {stockData[ticker].total_liabilities.value}</p>
                <p>Total Liabilities Y/Y Change: {stockData[ticker].total_liabilities['y/y_change']}</p>

                {/* <pre>{JSON.stringify(stockData, null, 2)}</pre> */}
            </div>
        </>
    )
}
