import ProgressBarCard from './ProgressBar';
import CircleBarCard from './CircleBar';
import { circularBarLabels, progressBarLabels, progressBarLabels1 } from '../Planning-KPI/utils';
import ProgressBar from './ProgressBarCard';

const PlanningKPI = ({ selectedPlanning }) => {
  const colors = ["#36a98a", "#ffbf00", "#69bc4b", "#7098FF", "#36a98a", "#ffbf00", "#69bc4b", "#7098FF", "#36a98a", "#ffbf00"]

  return (
    <>
      {progressBarLabels1 &&
        Object.keys(progressBarLabels1)?.map((data, ind) => (
          <ProgressBar
            icon={(ind + 1) % 2 === 0 ? 'planning' : 'statistics'}
            title={data}
            index={ind + 1}
          />
        ))
      }

      {progressBarLabels &&
        Object.keys(progressBarLabels)?.map((data, ind) => (
          <ProgressBarCard
            icon={(ind + 1) % 2 === 0 ? 'planning' : 'statistics'}
            title={data}
            index={ind + 1}
            selectedPlanning={selectedPlanning}
          />
        ))
      }

      {/* {
        circularBarLabels &&
        Object.keys(circularBarLabels).map((data, ind) => (
          <CircleBarCard key={ind}
            icon='planning'
            title={data}
            index={ind}
          />
        ))
      } */}
    </>
  );
};

export default PlanningKPI;