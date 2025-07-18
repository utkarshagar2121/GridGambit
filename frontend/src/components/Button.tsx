
export const Button=({onClick,children}:{onClick: ()=>void,children:React.ReactNode})=>{
    // const navigate=useNavigate()
    return<div>
        <button onClick={onClick}
        className="px-6 py-4 bg-green-500
        hover:bg-green-300 text-white
        font-bold rounded">
            {children}
        </button>
    </div>
}