import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Router from 'next/router';

import MultipleChoiceImage1 from "../../components/MultipleChoiceImage1";
import MultipleChoiceText2 from "../../components/MultipleChoiceText2";
import MissingWord3 from "../../components/MissingWord3";
import Teaching4 from "../../components/Teaching4";
import MatchingPairsText6 from "../../components/MatchingPairsText6";
import Translate9 from "../../components/Translate9";
import MatchingPairsImage11 from "../../components/MatchingPairsImage11";
import Writing14 from "../../components/Writing14";
import Bingo15 from "../../components/Bingo15";
import Question17 from "../../components/Question17";
import Listening18 from "../../components/Listening18";
import LessonProgress from "../../components/LessonProgress";

import {
  getLesson,
  getSlideAndMedia,
  textToSpeechThai
} from "../../services/dbAccess";
import { scoreContext } from "../../context/ScoreContext";
import { setScore, setOrder, setCurrentSlide } from "../../context/scoreActions";
import { useContext, useEffect } from "react";

const Lesson = ({ lesson, firstSlide }) => {
  const imageUrl = "https://sukhajata.com/images/";
  const { state, dispatch } = useContext(scoreContext);
  const { currentSlide, score, order } = state;

  useEffect(() => {
    if (firstSlide) {
      console.log(lesson);
      dispatch(setCurrentSlide(firstSlide));
      let _score = [];
      lesson.slides.forEach(() => {
        _score.push(0);
      });
      dispatch(setScore(_score));
      textToSpeechThai("ค่ะ"); //preload voice
    }
  }, [firstSlide]);

  const moveNextSlide = async result => {
    let newScore = score.splice(0);
    newScore[order] = result;
    dispatch(setScore(newScore));
    
    const newOrder = order + 1;
    dispatch(setOrder(newOrder));

    window.scrollTo(0,0);
    if (lesson.slides[newOrder]) {
      const _currentSlide = await getSlideAndMedia(lesson.slides[newOrder].id);
      dispatch(setCurrentSlide(_currentSlide));
    } else {
      //finished
      Router.push('/totals')
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 20 }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item style={{ width: "100%" }}>
          {lesson && <LessonProgress slides={lesson.slides} />}
        </Grid>
        {currentSlide && (
          <Grid item style={{ width: "100%" }}>
            {currentSlide.categoryId === "1" && (
              <MultipleChoiceImage1
                slide={currentSlide}
                imageUrl={imageUrl}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId === "2" && (
              <MultipleChoiceText2
                slide={currentSlide}
                imageUrl={imageUrl}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId === "3" && (
              <MissingWord3
                slide={currentSlide}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId === "4" && (
              <Teaching4
                slide={currentSlide}
                imageUrl={imageUrl}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId === "6" && (
              <MatchingPairsText6
                slide={currentSlide}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId === "9" && (
              <Translate9 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
            {currentSlide.categoryId === "11" && (
              <MatchingPairsImage11
                slide={currentSlide}
                moveNextSlide={moveNextSlide}
                imageUrl={imageUrl}
              />
            )}
            {currentSlide.categoryId === "14" && (
              <Writing14 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
            {currentSlide.categoryId === "15" && (
              <Bingo15 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
            {currentSlide.categoryId === "17" && (
              <Question17 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
            {currentSlide.categoryId === "18" && (
              <Listening18 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

/*
Lesson.getInitialProps = async ({ query }) => {
  const { id } = query;
  //const res = await fetch('https://sukhajata.com/api/lessons-th-en-graphql.php');
  //const data = await res.json();

  const lesson = await getLesson(id);
  const firstSlide = await getSlideAndMedia(lesson.slides[0].id);

  return {
    lesson: lesson,
    firstSlide: firstSlide,
  };
};*/

export async function getStaticProps({ params }) {
  const lesson = await getLesson(params.id);
  const firstSlide = await getSlideAndMedia(lesson.slides[0].id);

  return {
    props: {
      lesson: lesson,
      firstSlide: firstSlide,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '172' } },
      { params: { id: '173' } },
      { params: { id: '174' } },
      { params: { id: '175' } },
      { params: { id: '176' } },
      { params: { id: '177' } }
    ],
    fallback: false 
  };
}

export default Lesson;
