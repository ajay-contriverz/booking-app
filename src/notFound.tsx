import React from 'react'
import { Link } from 'react-router-dom'

export default function notFound() {
  return (
    <>
    <section className='min-vh-100 d-flex align-items-center justify-content-center'>
      <h5>404 page not found! <Link className='text-brand' to={"/"}>Go back to homepage!</Link></h5>
    </section>
    </>
  )
}
