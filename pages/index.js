import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Link from 'next/link';

import fetch from 'node-fetch';
import Header from '../components/Header';

const Index = ({ lessons }) => {
  //console.log(lessons);
  return (
    <>
    <Header />
    <Container style={{ marginTop: 20 }}>
      <Grid container justify="space-around" >
      {lessons.map(lesson => {
        const points = lesson.description.split('|');

        return (
          <Card
            key={lesson.id}
            style={{ width: 340, marginBottom: 20, marginRight: 20 }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt={lesson.name}
                height="200"
                image={"/img/" + lesson.lessonOrder + ".jpg"}
              />
              <CardContent>
                <Link href={"/lesson/" + lesson.id}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item>
                      <Chip color="primary" label={lesson.lessonOrder} />
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h5" component="h2">
                        {lesson.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
                <ul>
                  {points.map(item => (
                    <li key={item}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </CardActionArea>
          </Card>
        );})}
      </Grid>
    </Container>
    </>
  );
}

/*
Index.getInitialProps = async () => {
  // Call an external API endpoint
  const res = await fetch('https://sukhajata.com/api/lessons-th-en-graphql.php');
  const data = await res.json();
  console.log(data);

  return {
    lessons: data,
  }
}*/

export async function getStaticProps() {
  const res = await fetch(
    "https://sukhajata.com/api/lessons-th-en-graphql.php"
  );
  const data = await res.json();

  return {
    props: {
      lessons: data
    }
  };
}

export default Index;