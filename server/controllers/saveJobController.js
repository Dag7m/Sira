exports.saveJob = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const job_id = req.params.id;

    // Check if already saved
    const [existing] = await pool.query(
      `SELECT * FROM Saved_Jobs WHERE user_id = ? AND job_id = ?`,
      [user_id, job_id]
    );

    if (existing.length > 0) {
      // If already saved, unsave it
      await pool.query(
        `DELETE FROM Saved_Jobs WHERE user_id = ? AND job_id = ?`,
        [user_id, job_id]
      );
      return res.status(200).json({ message: "Job removed from saved list" });
    }

    // Otherwise, insert new
    await pool.query(
      `INSERT INTO Saved_Jobs (user_id, job_id, saved_at) VALUES (?, ?, CURRENT_TIMESTAMP)`,
      [user_id, job_id]
    );

    res.status(201).json({ message: "Job saved successfully" });
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
