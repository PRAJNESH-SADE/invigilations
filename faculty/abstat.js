// Add a new absentee statement
const addAbsenteeStatement = async (absenteeId, scheduleId, absentees, dateSubmitted) => {
    try {
      await firestore.collection('absenteeStatements').doc(absenteeId).set({
        scheduleId,
        absentees,
        dateSubmitted,
      });
    } catch (error) {
      console.error('Error adding absentee statement: ', error);
    }
  };
  