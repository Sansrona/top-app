import { IHeader } from "./Header.props";


export const Header = ({...props} : IHeader): JSX.Element=>{
    return (
        <div {...props}>
            HEader
        </div>
        );
};