import { saveStock } from "../lib/actions";

export function SaveStock({ ticker }: { ticker: string }) {
    const saveStockByTicker = saveStock.bind(null, ticker)
    return (
        <form action={saveStockByTicker}>
            <p className="pt-5">TODO CHECK IF STOCK IS SAVED BEFORE SHOWING BUTTON</p>
            <button type="submit" className="rounded-md border p-2 bg-green-500 hover:bg-gray-100">
                <span className="">Save Stock</span>
            </button>
        </form>
    )
}