import DetailsData from './components/detailsData';
import Last3MonthsRecord from './components/last3MonthsRecord';
import OneYearRecord from './components/1YearRecord';
import TopBrand from './components/topBrands';

export default function Page() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div>
          <TopBrand />
        </div>
        <div>
          <Last3MonthsRecord />
        </div>
        <div>
          <OneYearRecord />
        </div>
      </div>
      <div className="mt-3">
        <DetailsData />
      </div>
    </div>
  );
}
