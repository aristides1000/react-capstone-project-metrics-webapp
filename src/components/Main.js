import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { GrSend } from 'react-icons/gr';
import { BsEyeFill } from 'react-icons/bs';
import { bindActionCreators } from 'redux';
import { fetchVirus } from '../redux/virus/virusInformation';

const Filter = (props) => {
  const filterValues = (e) => {
    props.setFilter(e.target.value);
  };
  return (
    <div className="input-group mb-3">
      <input type="text" onChange={filterValues} className="form-control delete-shadow" />
      <span className="input-group-text">
        <GrSend />
      </span>
    </div>
  );
};

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

function Main() {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const loadCountriesAction = bindActionCreators(fetchVirus, dispatch);
  useEffect(() => {
    loadCountriesAction();
  }, []);
  console.log(useSelector((state) => state));
  const countryComponents = useSelector((state) => state.countries)
    .filter(({ name }) => name.toLowerCase().startsWith(filter.toLowerCase()))
    .map((country, index) => (
      <LinkContainer key={country.id} to={`/country/${country.id}`}>
        <div
          className={`
            col-6 d-flex flex-column justify-content-between
            ${([1, 0, 0, 1][index % 4]) ? 'intense-magenta' : 'light-magenta'}
          `}
        >
          <span className="text-white mt-1 mb-4 h5">
            <BsEyeFill />
          </span>
          <span className="text-white pointer">
            <h5 className="d-inline-block m-0 text-end fw-bold">{country.name.toUpperCase()}</h5>
            <p>
              Infections:
              {' '}
              {
                Number(country.today_confirmed).toLocaleString()
              }
            </p>
          </span>
        </div>
      </LinkContainer>
    ));

  const spinner = (
    <div className="d-flex justify-content-center align-items-center min-height">
      <div className="spinner" />
    </div>
  );
  return (
    <div className="container-fluid px-0 light-magenta pt-3">
      <div className="row m-0">
        <div className="col-12 text-white d-flex flex-column justify-content-center">
          <h2 className="m-0">World</h2>
          <p>
            Infections:
            {' '}
            {Number(useSelector((state) => state.totalConfirmed)).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="row pointer m-0 mt-4 pt-3 intense-magenta">
        <div className="row mx-0">
          <div className="col-12 px-0">
            <Filter setFilter={setFilter} />
          </div>
        </div>
        { useSelector((state) => state) !== {} ? countryComponents : spinner }
      </div>
    </div>
  );
}
export default Main;
