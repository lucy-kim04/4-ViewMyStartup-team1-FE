//구은모

import Container from '../components/Container';
import KemHeader from '../components/HeaderKEM';
import './CompanyListPage.css';
import { Link } from 'react-router-dom';
import TitleAndSearch from '../components/TitleAndSearch';
import StartupTableHead from '../components/StartupTableHead';
import CompanyList from '../components/CompanyList';
import { startups } from '../db/mockKem';

function CompanyListPage() {
  return (
    <>
      <KemHeader />
      <Container>
        <TitleAndSearch />
        <StartupTableHead />
        <CompanyList startups={startups} />
      </Container>
    </>
  );
}
export default CompanyListPage;
