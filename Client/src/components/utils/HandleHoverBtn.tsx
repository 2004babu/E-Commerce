const HandleHoverBtn = (e: React.MouseEvent<HTMLElement>, Content?: string) => {

    const thereHoverDiv = document.querySelector('#hoverDiv')
    if (thereHoverDiv) {

        thereHoverDiv.remove()
        return
    }

    if (e.currentTarget.parentElement) {
        const divEle = e.currentTarget.parentElement;

        const newDiv = document.createElement('div')
        newDiv.innerHTML = `<h1 class="px-2 py-1 bg-gray-200 text-sm font-normal rounded-md"  id="hoverDiv">${Content??''}</h1>`
        newDiv.style.position = 'fixed'

        newDiv.style.top = `${e.clientY + 30}px`;
        newDiv.style.left = `${e.clientX + 10}px`;


        divEle.appendChild(newDiv)

    }
}



export default HandleHoverBtn
