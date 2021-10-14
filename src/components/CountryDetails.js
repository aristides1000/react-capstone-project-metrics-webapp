import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function CountryDetails() {
  const params = useParams();
  const { id } = params;
  const country = Object.values(useSelector((state) => state.countries))
    .find((country) => country.id === id);
  return (
    <div className="container-fluid light-magenta mt-3 px-0">
      <div className="row m-0">
        <div className="col-12 text-white">
          <h3 className="fw-bold m-0">{country ? country.name.toUpperCase() : 'Loading...'}</h3>
          <p className="m-0">
            Infections:
            {' '}
            {country ? Number(country.today_confirmed).toLocaleString() : '0'}
          </p>
          <p>
            Deaths:
            {' '}
            {country ? Number(country.today_deaths).toLocaleString() : '0'}
          </p>
        </div>
        <ul className="col-12">
          <li>
            <p className="text-white">
              New confirm:
              { country.today_new_confirmed }
            </p>
          </li>
          <li>
            <p className="text-white">
              New deaths:
              { country.today_new_deaths }
            </p>
          </li>
          <li>
            <p className="text-white">
              New recovered:
              { country.today_new_recovered }
            </p>
          </li>
          <li>
            <p className="text-white">
              Open Cases:
              { country.today_open_cases }
            </p>
          </li>
          <li>
            <p className="text-white">
              New Open Cases:
              { country.today_new_open_cases }
            </p>
          </li>
          <li>
            <p className="text-white">
              Source:
              { country.source }
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default CountryDetails;
