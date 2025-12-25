import { useParams } from "react-router-dom";
import ShowInfo from "../Components/ShowInfo.jsx";
function MovieInfoPage() {
  const { id: theId } = useParams();

  return (
    <>
      <ShowInfo
        id={theId}
        url={`https://api.themoviedb.org/3/movie/${theId}?api_key=e7647e37d4a34ff0aad4bee7f30b20de&append_to_response=credits,reviews`}
      />
    </>
  );
}

export default MovieInfoPage;
