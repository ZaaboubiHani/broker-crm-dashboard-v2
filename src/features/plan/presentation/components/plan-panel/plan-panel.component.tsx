import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import StarIcon from '@mui/icons-material/Star';
import { DotSpinner } from '@uiball/loaders';
import VisitModel from '../../../domain/models/visit.model';
import { VisitState } from '../../../../../core/entities/visit.entity';
interface PlanPanelProps {
    id?: string;
    data: VisitModel[];
    isLoading: boolean;
    onTaskClick: (clientId: string, date: Date, visit: VisitModel) => void;
}

const PlanPanel: React.FC<PlanPanelProps> = ({ id, data, isLoading, onTaskClick }) => {

    if (isLoading) {
        return (

            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <DotSpinner
                    size={40}
                    speed={0.9}
                    color="black"
                />
            </div>
        );
    }
    else {
        return (
            <div id={id} style={{

                flexDirection: 'row',
                flexGrow: '1',
                margin: '4px',
                borderRadius: '8px',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'start',
                width: '100%',
                overflowY: 'auto',

            }}>
                {
                    data.map((e) => (
                        <Card sx={{
                            width: '180px',
                            margin: '4px',
                            padding: '4px',
                            display: 'flex',
                            height: '100px',
                            position: 'relative',
                            justifyContent: 'space-between', border: '1px solid teal'
                        }}>
                            <CardActionArea onClick={() => {
                                if (e.state === VisitState.done) {
                                    onTaskClick(e.client!._id!, e.visitDate!, e);
                                }
                            }}>
                                <CardContent sx={{ margin: 0, padding: '0px 0px 4px 8px' }}>
                                    <Typography gutterBottom sx={{ margin: 0, fontSize: '14px', maxWidth: '160px' }} component="div">
                                        {e.client?.fullName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ margin: 0, fontSize: '13px' }} color="text.secondary">
                                        spécialité: {e.client?.speciality?.name}
                                    </Typography>
                                </CardContent>
                                <Typography sx={{
                                    margin: "0px",
                                    fontSize: '11px',
                                    whiteSpace: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center'
                                }} variant="body2" color="text.secondary">
                                    <LocationOnIcon sx={{
                                        width: '20px',
                                        height: '20px'
                                    }} /> localisation :{e.client?.commune}, {e.client?.wilaya?.name}
                                </Typography>

                                <Typography sx={{
                                    margin: "0px ",
                                    fontSize: '11px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }} variant="body2" color="text.secondary">
                                    <StarIcon sx={{
                                        width: '20px',
                                        height: '20px'
                                    }} /> potentiel : {e.client?.potential}
                                </Typography>
                            </CardActionArea>
                            {
                                e.state === VisitState.done ? (<CheckCircleIcon style={{ display: 'block', position: 'absolute', color: 'lime', right: 8, top: 8 }} />) : (<HourglassBottomIcon style={{ display: 'block', position: 'absolute', color: 'orange', right: 8, top: 8 }} />)
                            }
                        </Card>
                    ))
                }
            </div>
        );
    }

};

export default PlanPanel;
