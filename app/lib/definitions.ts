export type User = {
    id: string,
    name: string;
    email: string;
    password: string
}

export type SavedStock = {
    id: string,
    user_id: string,
    ticker: string,
    saved_at: string
}

export type StockData = {
    stockData: {
        [ticker: string]: {
            revenue: {
                value: number | string,
                'y/y_change': string
            },
            cash_from_financing: {
                value: number | string,
                'y/y_change': string
            },
            cash_from_operations: {
                value: number | string,
                'y/y_change': string
            },
            eps: {
                value: number | string,
                'y/y_change': string
            },
            net_income: {
                value: number | string,
                'y/y_change': string
            },
            total_assets: {
                value: number | string,
                'y/y_change': string
            },
            total_liabilities: {
                value: number | string,
                'y/y_change': string
            },
            fetched_at: {
                date: string,
                expires: string
            },
        }
    }
}
