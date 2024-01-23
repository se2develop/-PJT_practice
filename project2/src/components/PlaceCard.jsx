import React from "react";
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PlaceCard = () => {
  const searchResults = useSelector((state) => state.places);
  console.log(searchResults);


  return (
    <>
      {searchResults.map((place, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAWU5eFih7moY7W2AV8Cx3wAE8Hnkc60x8bFx-jsB5sbAhy_v8HvTUFCC-ooAYfdA-LZM7ucgTWHN9u0vfMBfgP84V3S2CzUPVcjofa--GVtTYz365DOD79OdKYunrJ20ukzTsQPD-KuAs84kVUoMW9QQq6QOAQsjEOHCxPNso_I_qKolASkx&3u200&4u200&5m1&2e1&callback=none&key=AIzaSyA_FWc_9IricQuFYYctKYV-cxI-CdLCoHI&token=97048"
            title={place.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {place.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {place.businessStatus}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {place.formattedAddress}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {place.rating}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default PlaceCard;