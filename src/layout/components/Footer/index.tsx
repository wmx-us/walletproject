/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.scoped.css"

const LayoutFooter =(props:any) => {
    const {themeConfig} = props

    return (
        <>
        {!themeConfig.footer && (
            <div className="footer">
                <a target="_blank" rel="noreferrer"> 2022 © Hooks-Admin By Hooks Technology.</a>
            </div>
        )}
        </>
    )
}

export default LayoutFooter