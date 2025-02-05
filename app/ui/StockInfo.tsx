import fetchStockData from '../api/fetchStockData'
import { SaveStock } from './buttons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './tailwind_ui_kit/table';
import { stockTableRows } from '../lib/stockTableHeaders';

// Basic component to display stock information
export default async function StockInfo(props: { ticker: string }) {

    const ticker = props.ticker
    const stockData = await fetchStockData(ticker)

    // Workaround while i figure out what to do with data & expires data
    // TODO - DO NOT LEAVE CODE LIKE THIS
    const data = stockData[ticker]
    delete data['fetched_at']

    console.log(data)


    return (

        <>
            <Table grid className='bg-gray-300 rounded-lg m-auto max-w-lg'>
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

            <SaveStock ticker={ticker} />

        </>
    )
}
