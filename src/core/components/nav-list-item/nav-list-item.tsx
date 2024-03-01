
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { PRIMARY_COLOR_HIGHLIGHT } from '../../../config/themes/theme';

interface NavListItemProps {
    name: string,
    route: string,
    icon: any,
    isOpen: Boolean,
}


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} TransitionProps={{ timeout: 250 }}/>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        top: '-18px',
        left: '-8px',
        position: 'absolute',
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        width: 'max-content',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));


const NavListItem: React.FC<NavListItemProps> = ({ name, route, icon, isOpen }) => {

    const [onHoverBool, setOnHoverBool] = useState(false);
    const location = useLocation();

    return (
        <HtmlTooltip
            sx={{ display: isOpen ? 'none' : 'block' }}
            title={
                <React.Fragment>
                    <Typography color="inherit">{name}</Typography>
                </React.Fragment>
            } placement='right'>
            <a 
                onMouseEnter={() => {
                    setOnHoverBool(true);
                }}
                onMouseLeave={() => {
                    setOnHoverBool(false);
                }}
                style={{
                    display: 'flex',
                    backgroundColor: onHoverBool || location.pathname === route ? PRIMARY_COLOR_HIGHLIGHT : undefined,
                    height: '26px',
                    margin:'1px 0px',
                    transition: 'all 300ms ease',
                    position: 'relative',
                    padding:'8px 8px 8px 16px',
                    alignItems:'center',
                    textDecoration:'none',
                }} href={route}>
                {icon}
                <p style={{
                    color: 'white',
                    transition: 'all 0.5s ease',
                    opacity: isOpen ? '1' : '0',
                    
                }}>
                    {name}
                </p>
            </a>
        </HtmlTooltip>
    );
}


export default NavListItem;