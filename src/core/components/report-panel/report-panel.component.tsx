import React from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import Divider from '@mui/material/Divider';
import CommentIcon from '@mui/icons-material/Comment';
import HailIcon from '@mui/icons-material/Hail';
import FlagIcon from '@mui/icons-material/Flag';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button/Button';
import { formatDateToYYYYMMDD, formatTime } from '../../functions/date-format';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ReportEntity from '../../entities/report.entity';
import { ClientType } from '../../entities/client.entity';


interface ReportPanelProps {
    report?: ReportEntity;
    location?: string;
    showBackButton?: boolean;
    clientType?: ClientType;
    onBackClick?: () => void;
}

const openGoogleMaps = (location?: string) => {
    if (location && location.length > 0) {
        let coordinates = location.split(',');
        const latitude = coordinates[0];
        const longitude = coordinates[1];
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, '_blank');
    }
};


const ReportPanel: React.FC<ReportPanelProps> = ({ report, clientType, location, showBackButton, onBackClick }) => {
    if (report) {
        return (
            <div style={{ margin: '16px 0px 16px 16px', flexGrow: '1', flex: '1', height: '96%', overflowY: 'auto', overflowX: 'hidden', paddingRight: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'start',
                    }}>
                        <Button style={{
                            display: showBackButton === undefined || showBackButton === false ? 'none' : 'flex',
                            minWidth: '10px',
                            height: '40px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 'none',
                            borderRadius: '50px',
                            marginRight:'8px'
                        }}
                            size='small'
                            onClick={onBackClick}
                            variant="outlined">
                            <ArrowBackIosNewIcon style={{ width: '20px', height: '20px', color: 'rgb(0, 182, 182)' }} />
                        </Button>
                        <div style={{ display: 'flex', margin: '0px', height: '32px', alignItems: 'center' }}>
                            <h6 style={{ margin: '0px', marginRight: '8px', fontSize: '13px', fontWeight: 'normal' }}>Date: {formatDateToYYYYMMDD(report.createdAt!)}</h6>
                            <h6 style={{ fontSize: '13px', margin: '0px', fontWeight: 'normal' }}>Heure: {formatTime(report.createdAt!)}</h6>
                        </div>
                    </div>
                    <Button style={{
                        height: '40px',
                        textDecoration: 'none',
                    }} onClick={() => openGoogleMaps(location)} variant="outlined"> <LocationOnIcon />localisation</Button>
                </div>
                <Divider component="div" style={{ margin: '8px 0px' }} />
                <h4 style={{ fontSize: 17 }}><InventoryIcon style={{ fontSize: 17 }} /> Produits:</h4>
                {
                    report.products?.map((product) => (
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px', height: '32px' }}>
                            <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', height: '32px' }}>{product.product.name}</h6>
                            {
                                clientType !== ClientType.doctor ? (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '66%', margin: '0px', height: '32px' }}>
                                        <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', height: '32px' }}>quantité:{product.quantity}</h6>
                                        <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', height: '32px' }}>{product.rotations}/mois</h6>
                                    </div>
                                ) : null
                            }
                        </div>
                    ))
                }
                <Divider component="div" style={{ margin: '8px 0px' }} />
                {
                    clientType !== ClientType.doctor ?
                        (
                            <div>
                                <h4 style={{ fontSize: 17, margin: '0px', height: '32px' }}><InventoryIcon style={{ fontSize: 17 }} /> Produits concurrents:</h4>
                                {
                                    report.coProducts?.map((coProduct) => (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px', height: '32px' }}>
                                            <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', height: '32px' }}>{coProduct.coProduct.name}</h6>
                                            <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', height: '32px' }}>quantité: {coProduct.quantity}</h6>
                                            <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', height: '32px' }}>{coProduct.rotations}/mois</h6>
                                        </div>
                                    ))
                                }
                                <Divider component="div" style={{ margin: '8px 0px' }} />
                            </div>
                        ) : null
                }
                {
                    clientType === ClientType.pharmacy ?
                        (
                            <div>
                                <h4 style={{ fontSize: 17, margin: '0px', height: '32px' }}><HailIcon style={{ fontSize: 17 }} /> Fournisseurs:</h4>
                                {
                                    report.suppliers?.map((supplier) => (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px', height: '32px' }}>
                                            <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', height: '32px' }}>{supplier.fullName}</h6>
                                            <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', height: '32px' }}>{supplier.wilaya?.name}</h6>
                                            <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', height: '32px' }}>{supplier.commune}</h6>
                                        </div>
                                    ))
                                }
                                <Divider component="div" style={{ margin: '8px 0px' }} />
                            </div>
                        ) : null
                }
                {
                    clientType === ClientType.doctor ?
                        (
                            <div>
                                <h4 style={{ fontSize: 17, margin: '0px', height: '32px' }}><CommentIcon style={{ fontSize: 17 }} /> Commentaires:</h4>
                                {report.comments?.map((comment) => (
                                    <div style={{ display: 'flex', margin: '0px', height: '32px' }}>
                                        <h6 style={{
                                            fontSize: 15,
                                            fontWeight: '400',
                                            border: "solid black 1px",
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            margin: "4px",
                                            height: '32px'
                                        }}
                                        >{comment.comment}</h6>
                                    </div>
                                ))
                                }
                                <Divider component="div" style={{ margin: '8px 0px' }} />
                            </div>
                        )
                        : null
                }
                {
                    clientType == ClientType.doctor ? (
                        <div>
                            <h4 style={{ fontSize: 17, margin: '0px', height: '32px' }}><FlagIcon style={{ fontSize: 17 }} /> Objectif:</h4>
                            <h6 style={{ fontSize: 15, fontWeight: '400', margin: '0px', }}>{report.objectif}</h6>
                            <Divider component="div" style={{ margin: '8px 0px' }} />
                        </div>
                    )
                        : null
                }
                <h4 style={{ fontSize: 17, margin: '0px', height: '32px' }}><EditNoteIcon style={{ fontSize: 17 }} /> Rapport de visite:</h4>
                <h6 style={{
                    fontSize: 15, fontWeight: '400',
                    width: '340px',
                    flex: '1',
                    overflowWrap: 'break-word',
                    overflow: 'hidden',
                    margin: '0px',
                }}>{report.note}</h6>
                <Divider component="div" style={{ margin: '8px 0px' }} />
               
                {
                    clientType === ClientType.wholesaler || !clientType ?
                        null :
                        clientType === ClientType.doctor ?
                            (
                                <div>
                                    <h4 style={{ fontSize: 17, margin: '0px', height: '32px' }}><HailIcon style={{ fontSize: 17 }} /> Pharmacies à proximité:</h4>
                                    {
                                        report.nearbyClients?.map((client, index) => (
                                            <div style={{ backgroundColor: '#eee', margin: '0px', padding: '4px', borderRadius: '4px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px', height: '32px' }}>
                                                    <div>
                                                        <h6 style={{ fontSize: 12, fontWeight: '400', margin: '0px', height: '16px' }}><b>Nom et Prénom:</b> {client.fullName ?? '_'}</h6>
                                                      
                                                    </div>
                                                </div>
                                                {
                                                    index !== report.nearbyClients!.length - 1 ? (
                                                        <Divider component="div" style={{ margin: '0px', marginTop: '4px' }} />) : null
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div>
                                    <h4 style={{ fontSize: 17, margin: '0px', height: '32px' }}><HailIcon style={{ fontSize: 17 }} /> Médecins prescripteurs:</h4>
                                    {
                                        report.nearbyClients?.map((client, index) => (
                                            <div style={{ backgroundColor: '#eee', margin: '0px', padding: '4px', borderRadius: '4px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px', height: '32px' }}>
                                                    <div>
                                                        <h6 style={{ fontSize: 12, fontWeight: '400', margin: '0px', height: '16px' }}><b>Nom et Prénom:</b> {client.fullName ?? '_'}</h6>
                                                     
                                                    </div>
                                                    <div>
                                                        <h6 style={{ fontSize: 12, fontWeight: '400', margin: '0px', height: '16px' }}><b>Specialité:</b> {client.speciality?.name ?? '_'}</h6>
                                                        <h6 style={{ fontSize: 12, fontWeight: '400', margin: '0px', height: '16px' }}><b>Grade:</b> {client.grade ?? '_'}</h6>
                                                    </div>
                                                </div>
                                                {
                                                    index !== report.nearbyClients!.length - 1 ? (
                                                        <Divider component="div" style={{ margin: '0px', marginTop: '4px' }} />) : null
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                }
            </div>
        );
    } else {
        return (
            <div style={
                {
                    width: '100%',
                    height: "100%",
                    display: 'grid',
                    placeItems: 'center',
                    textAlign:'center',
                }
            }>
                Cliquez sur voir pour afficher les détails
            </div>
        )
    }
}


export default ReportPanel;