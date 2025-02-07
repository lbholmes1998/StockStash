import fetchStockData from '../api/fetchStockData'
import { SaveStock } from './buttons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './tailwind_ui_kit/table';
import { stockTableRows } from '../lib/stockTableHeaders';
import { fetchUserSavedStocks } from '../lib/data';
import type { Session } from 'next-auth';


// Basic component to display stock information
export default async function StockInfo(props: { ticker: string, userSession: Session }) {

    const session = props.userSession
    const ticker = props.ticker
    const stockData = await fetchStockData(ticker)

    // Workaround while i figure out what to do with data & expires data
    // TODO - DO NOT LEAVE CODE LIKE THIS
    const data = stockData[ticker]
    delete data['fetched_at']

    // Get list of user saved stocks
    const savedStocks = await fetchUserSavedStocks(session.user.id)
    let saved = savedStocks.map((stock) => {
        return stock.ticker
    })

    const found = saved.find((stock) => stock === ticker)

    return (

        <>
            <Table grid className='bg-gray-300 rounded-lg m-auto'>
                <TableHead>
                    <TableRow>
                        <TableHeader></TableHeader>
                        <TableHeader>Value</TableHeader>
                        <TableHeader>Year on Year Change</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(data).map((d: any) => (
                        <TableRow>
                            <TableCell className="font-medium text-zinc-950">
                                {d.display_name}
                            </TableCell>
                            <TableCell className="font-medium text-zinc-950 text-center">
                                {d.value}
                            </TableCell>
                            <TableCell className="font-medium text-zinc-950 text-center">
                                {d.yy_change}
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

            {found ? <p>Stock Saved</p> : <SaveStock ticker={ticker}/>}
            
        </>
    )
}
