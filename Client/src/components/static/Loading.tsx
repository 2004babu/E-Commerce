
const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col '>
      <button type="button" className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded flex items-center justify-center disabled:opacity-50" disabled>
  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
    <path className="opacity-75" d="M4 12a8 8 0 018-8V2a10 10 0 000 20v-2a8 8 0 01-8-8z"></path>
  </svg>
  Processing...
</button>

    </div>
  )
}

export default Loading
