import React from 'react'
import { HiOutlineHomeModern } from 'react-icons/hi2'

function EmptyState({ title = 'No homes found', description = 'Try another category or search for a different city.' }) {
  return (
    <div className="mx-auto flex min-h-[280px] w-full max-w-xl flex-col items-center justify-center rounded-[2rem] border border-dashed border-stone-300 bg-white/70 px-6 py-12 text-center shadow-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-100 text-orange-600">
        <HiOutlineHomeModern className="text-3xl" />
      </div>
      <h2 className="text-2xl font-black tracking-tight text-stone-950">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">{description}</p>
    </div>
  )
}

export default EmptyState
