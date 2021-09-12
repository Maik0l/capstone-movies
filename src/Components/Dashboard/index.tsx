import { Heading, Flex } from "@chakra-ui/layout";
import MovieCard from "../MovieCard";
import BoxContainer from "../BoxContainer";
import MovieContainer from "../MovieContainer";
<<<<<<< HEAD

const Dashboard = () => {
=======
import { useMovies } from "../../Providers/Movies/index";
import { useEffect, useState } from "react";

const DashboardComponent = () => {
  const { getMovies, movies } = useMovies();
  const [count, setCount] = useState<number>(0);
  const imgurl = "https://image.tmdb.org/t/p/original";

  const UpMovies = movies.filter((movie) => {
    const date = movie.release_date?.replaceAll("-", "");
    return Number(date) > 202109;
  });

  useEffect(() => {
    if (movies.length < 1) {
      getMovies();
    }
  }, [movies, getMovies]);
  console.log(movies);
>>>>>>> 6e6104d0346d58b64491eee011f7f5c682d4890b
  return (
    <Flex
      w="85%"
      h="100vh"
      justifyContent="flex-end"
      alignItems="center"
      flexDirection="column"
    >
      <Heading w="76%" fontWeight="400" mb="3px" color="fontColor.white100">
        Up coming Movies
      </Heading>
      <MovieContainer type="column">
        <BoxContainer
          type="Upcomming"
          bgImg="https://image.tmdb.org/t/p/original/tFBVXnqmsmoSFR3rbltTfdGIMgV.jpg"
        >
          <MovieCard
            release_date="20-05-2013"
            title="titulo"
            type="upComing"
            popularity={10}
            imgUrl="https://image.tmdb.org/t/p/original/pUK9duiCK1PKqWA5rRQ4XBMHITH.jpg"
          />
        </BoxContainer>
        <Heading
          w="76%"
          fontSize="20px"
          fontWeight="400"
          color="fontColor.white100"
        >
          Browse Movies
        </Heading>
        <BoxContainer bgImg="https://image.tmdb.org/t/p/original/tFBVXnqmsmoSFR3rbltTfdGIMgV.jpg">
          {[1, 2, 3, 4, 5, 3, 1, 4, 5, 3, 45].map((element) => (
            <MovieCard
              release_date="20-05-2013"
              title="titulo"
              popularity={10}
              imgUrl="https://image.tmdb.org/t/p/original/pUK9duiCK1PKqWA5rRQ4XBMHITH.jpg"
            />
          ))}
        </BoxContainer>
        <Heading
          w="76%"
          fontSize="20px"
          fontWeight="400"
          color="fontColor.white100"
        >
          My movies
        </Heading>
        <BoxContainer bgImg="https://image.tmdb.org/t/p/original/tFBVXnqmsmoSFR3rbltTfdGIMgV.jpg">
          <MovieCard
            release_date="20-05-2013"
            title="titulo"
            popularity={10}
            imgUrl="https://image.tmdb.org/t/p/original/pUK9duiCK1PKqWA5rRQ4XBMHITH.jpg"
          />
        </BoxContainer>
      </MovieContainer>
    </Flex>
  );
};
export default Dashboard;
