'use client'

import { useActions, useUIState } from 'ai/rsc'

import type { AI } from '@/lib/chat/actions'

interface Stock {
  symbol: string
  name: string
  price: number
  delta: number
}

export function Stocks({ props: stocks }: { props: Stock[] }) {
  const [, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  return (
    <div>
      <div className="mb-4 w-full flex flex-col gap-2 overflow-y-scroll pb-4 text-sm">
        {stocks.map(stock => (
          <button
            key={stock.symbol}
            className="flex cursor-pointer flex-row gap-2 rounded-lg bg-zinc-800 p-2 text-left hover:bg-zinc-700"
            onClick={async () => {
              const response = await submitUserMessage(`View ${stock.symbol}`)
              setMessages(currentMessages => [...currentMessages, response])
            }}
          >
            <div
              className={`text-xl ${
                stock.delta > 0 ? 'text-green-600' : 'text-red-600'
              } flex w-11 flex-row justify-center rounded-md bg-white/10 p-2`}
            >
              {stock.delta > 0 ? '↑' : '↓'}
            </div>
            <div className="flex flex-col">
              <div className="bold uppercase text-zinc-300">{stock.symbol} ({stock.name})</div>
              <div className="text-base text-zinc-500">
                ${stock.price.toFixed(2)}
              </div>
            </div>
            <div className="ml-auto flex flex-col">
              <div
                className={`${
                  stock.delta > 0 ? 'text-green-600' : 'text-red-600'
                } bold text-right uppercase`}
              >
                {` ${(stock.delta).toFixed(2)}%`}
              </div>
              <div
                className={`${
                  stock.delta > 0 ? 'text-green-700' : 'text-red-700'
                } text-right text-base`}
              >
                {(stock.delta * stock.price).toFixed(2)}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="p-4 text-center text-sm text-zinc-500">
        Note: Data and latency are simulated for illustrative purposes and
        should not be considered as financial advice.
      </div>
    </div>
  )
}
