import Image from "../components/Image";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { API } from "../components/api-instance";
import Button from "../components/Button";

const Gallary = () => {
  const [getImageData, setImageData] = useState([]);
  const [getLoading, setLoading] = useState(false);

  const [changePage, page] = useState(1);

  function fetchImage() {
    setImageData([]);
    console.log("Fetching image");
    API.get(`/photos?page=` + changePage + `&per_page=30`)
      .then(function (res) {
        setLoading(false);
        setImageData(res.data);
      })
      .catch((err) => console.error(err));
    setLoading(true);
  }
  function increasePage(x) {
    console.log("passed from button", x);
    page(changePage + 1);
  }

  useEffect(fetchImage, [changePage]);
  return (
    <>
      <div className="grid place-items-center">
        {getLoading ? <Loading /> : ""}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 place-items-center">
        {getImageData.map((obj) => (
          <Image dataobj={obj} key={obj.id} />
        ))}
      </div>
      <div className="text-right p-3">
        <Button doAfterOnClick={increasePage}>Next page</Button>
      </div>
    </>
  );
};
export default Gallary;
