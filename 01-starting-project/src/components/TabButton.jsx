export default function TabButton({extra="", isSelected, children, ...props}) {
    return <li><button 
        className={isSelected ? "active" : null} 
        {...props}
    >{children}{extra}</button></li>;
}