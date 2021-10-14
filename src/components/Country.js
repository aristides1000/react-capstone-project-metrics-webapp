import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs';

function Country() {
  const params = useParams();
  const { id } = params;
  const country = useSelector((state) => state.countries).find((country) => country.id === id);
  const states = (country.regions.length > 0
    ? (country.regions.map(
      (region, index) => (
        <div
          className={`d-flex justify-content-between
          align-items-center p-2 text-white
          ${index % 2 ? 'light-magenta' : 'intense-magenta'
      }`}
          key={region.id}
        >
          <h5 className="m-0 fw-light">{region.name}</h5>
          <span className="d-flex align-items-center">
            <p className="m-0 me-2">
              Infections:
              {' '}
              {Number(region.today_confirmed).toLocaleString()}
            </p>
            <span className="m-0 h5 ">
              <BsEyeFill />
            </span>
          </span>
        </div>
      ),
    ))
    : (
      <div className="intense-magenta text-white d-flex align-items-center p-2">
        <h5 className="fw-light ps-3 m-0">
          No information about cities
        </h5>
      </div>
    ));

  return (
    <div className="container-fluid light-magenta mt-3 px-0">
      <div className="row m-0">
        <div className="col-12 text-white">
          <h3 className="fw-bold m-0">{country ? country.name.toUpperCase() : 'Loading...'}</h3>
          <p>
            Infections:
            {' '}
            {country ? Number(country.today_confirmed).toLocaleString() : '0'}
          </p>
        </div>
      </div>
      {states}
    </div>
  );
}
export default Country;
