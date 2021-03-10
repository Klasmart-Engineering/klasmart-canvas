import { INewStamp, IPortfolio } from '../../../interfaces/portfolio/portfolio';

/**
 * Default portfolio state.
 */
const initialState: IPortfolio[] = [
  {
    studentId: 'student',
    studentStamps: [],
  },
  {
    studentId: 'student2',
    studentStamps: [],
  },
];

/**
 * Reducer
 * @param state Redux state
 * @param action Action
 */
export function portfolioReducer(
  state: IPortfolio[] = initialState,
  action: { type: string; payload: INewStamp }
) {
  switch (action.type) {
    case 'ADD_STAMP':
      const { studentId, stamp } = action.payload;

      const newState = state.map((portfolio) => {
        // Finding for the element with the received studentId
        if (portfolio.studentId === studentId) {
          const stampExist = portfolio.studentStamps.find((current) => {
            return current.stamp === stamp;
          });

          /**
           * If received stamp doesn't exists in the student's portfolio
           * this just will be added in the student's stamps array
           * with the quantity of 1
           */
          if (!stampExist) {
            return {
              studentId,
              studentStamps: [
                ...portfolio.studentStamps,
                { stamp, quantity: 1 },
              ],
            };
          }

          /**
           * If received stamp exists in the student's porfolio,
           * is necessary map the student's stamps array
           * to update the quantity of stamps in the received stamp
           */
          const stampsUpdated = portfolio.studentStamps.map((currentStamp) => {
            /**
             * If the current stamp is the received stamp,
             * current stamp quantity will increased in 1
             */
            if (currentStamp.stamp === stamp) {
              return {
                stamp: currentStamp.stamp,
                quantity: currentStamp.quantity += 1,
              };
            }

            return currentStamp;
          });

          return {
            studentId,
            studentStamps: stampsUpdated,
          };
        }

        return portfolio;
      });

      return newState;

    default:
      return state;
  }
}
