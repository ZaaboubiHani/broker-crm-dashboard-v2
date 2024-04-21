import React from 'react';
import { Document, Page, Text, View, Image, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import CompanyModel from '../../../domain/models/company.model';
import { formatDateToYYYYMMDD } from '../../../../../core/functions/date-format';

interface PdfPreviewProps {
    company: CompanyModel;
}

function getContrastingColor(hexColor: string): string {
    // Convert hex color to RGB
    const match = hexColor.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!match) {
        return 'black'; // Default to black if the color format is invalid
    }

    const rgb = {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16)
    };

    // Calculate the relative luminance
    const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;

    // Use black or white based on luminance
    return luminance > 0.5 ? 'black' : 'white';
}


const styles = StyleSheet.create({
    document: {
        width: '100%',
        alignContent: 'stretch',
    },
    page: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        padding: '32px',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    sectionOneTitle: {
        fontSize: '12px',
        height: '22px',
        fontWeight: 'bold',
    },
    image: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'red',
        height: 75,
    },
});



const PdfPreview: React.FC<PdfPreviewProps> = ({ company }) => {
    return (
        <PDFViewer style={styles.document}>
            <Document style={styles.document}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Image
                            style={styles.image}
                            src={company.logo?.url}>
                        </Image>
                        <View >
                            <Text
                                style={styles.sectionOneTitle}
                            >Laboratoire SPA-S BIOXYTECH</Text>
                            <Text
                                style={styles.sectionOneTitle}
                            >Address Parc à fourrage, Batna</Text>
                            <Text
                                style={styles.sectionOneTitle}
                            >Tel: 0758452148 / 0698547122</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: '25px',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontWeight: 'ultrabold',
                            textAlign: 'center',
                            textDecoration: 'underline',
                            fontSize: '20px',
                            height: '40px',
                        }}>Bon De Commande</Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                    }}>


                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%'
                        }}>

                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '16px',
                            }}>
                                <Text
                                    style={{
                                        textDecoration: 'underline',
                                        marginRight: '8px',
                                        fontSize: '15px'
                                    }}
                                >Délégué:</Text>
                                <Text
                                    style={{
                                        fontSize: '15px'
                                    }}
                                >.........................</Text>
                            </View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '16px',
                            }}>
                                <Text
                                    style={{
                                        textDecoration: 'underline',
                                        marginRight: '8px',
                                        fontSize: '15px'
                                    }}
                                >Client:</Text>
                                <Text
                                    style={{
                                        fontSize: '15px'
                                    }}
                                >.........................</Text>
                            </View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '16px',
                            }}>
                                <Text
                                    style={{
                                        textDecoration: 'underline',
                                        marginRight: '8px',
                                        fontSize: '15px'
                                    }}
                                >Wilaya:</Text>
                                <Text
                                    style={{
                                        fontSize: '15px'
                                    }}
                                >.........................</Text>
                            </View>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%'
                        }}>

                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '16px',
                            }}>
                                <Text
                                    style={{
                                        textDecoration: 'underline',
                                        marginRight: '8px',
                                        fontSize: '15px'
                                    }}
                                >Date:</Text>
                                <Text
                                    style={{
                                        fontSize: '15px'
                                    }}
                                >.........................</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{
                        marginTop: '1em',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        flexWrap: 'wrap',
                        fontSize: '11px'
                    }}>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: getContrastingColor(company.color!),
                            border: '1px solid black',
                            backgroundColor: company.color,
                            flex: '0 1 25%'
                        }}>
                            <Text>Designation</Text>
                        </View>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: getContrastingColor(company.color!),
                            border: '1px solid black',
                            backgroundColor: company.color,
                            flex: '0 1 10%'
                        }}>
                            <Text>Colis</Text>
                        </View>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: getContrastingColor(company.color!),
                            border: '1px solid black',
                            backgroundColor: company.color,
                            flex: '0 1 11%'
                        }}>
                            <Text>Qte</Text>
                        </View>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: getContrastingColor(company.color!),
                            border: '1px solid black',
                            backgroundColor: company.color,
                            flex: '0 1 25%'
                        }}>
                            <Text>Prix Pharmacie</Text>
                        </View>

                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: getContrastingColor(company.color!),
                            border: '1px solid black',
                            backgroundColor: company.color,
                            flex: '0 1 11%'
                        }}>
                            <Text>PPA</Text>
                        </View>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: getContrastingColor(company.color!),
                            border: '1px solid black',
                            backgroundColor: company.color,
                            flex: '0 1 15%'
                        }}>
                            <Text>DDF</Text>
                        </View>
                    </View>

                    <View style={{
                        display: 'flex',
                        width: '100%',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        fontSize: '11px'
                    }}>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            border: '1px solid black',
                            flex: '0 1 25%'
                        }}>
                            <Text>XXX</Text>
                        </View>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            border: '1px solid black',
                            flex: '0 1 10%'
                        }}>
                            <Text>50</Text>
                        </View>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            border: '1px solid black',
                            flex: '0 1 11%'
                        }}>
                            <Text>5</Text>
                        </View>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            border: '1px solid black',
                            flex: '0 1 25%'
                        }}>
                            <Text>2189.39</Text>
                        </View>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            border: '1px solid black',
                            flex: '0 1 11%'
                        }}>
                            <Text>2408.33</Text>
                        </View>
                        <View style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            border: '1px solid black',
                            flex: '0 1 15%'
                        }}>
                            <Text>{formatDateToYYYYMMDD(new Date())}</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: '16px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            fontSize: '11px'
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                marginRight: '8px'
                            }}>Fourniseurs:</Text>
                            <Text>.....................................</Text>
                        </View>
                        <View style={{
                            marginTop: '1em',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>cx
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: '11px'
                            }}>Cachet du client</Text>
                            <View style={{
                                marginTop: '1em',
                                display: 'flex',
                                width:'150px',
                                alignItems: 'center',
                                flexDirection: 'column',
                                border: '1px solid black',
                                borderRadius: '8px',
                                padding: '32px',
                            }}>

                            </View>

                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>

    );
};

export default PdfPreview;
