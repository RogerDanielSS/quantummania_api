CREATE OR REPLACE FUNCTION validate_score()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.score < 0 OR NEW.score > 100 THEN
    RAISE EXCEPTION 'Score must be between 0 and 100';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_user_score
BEFORE INSERT OR UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION validate_score();

CREATE TRIGGER validate_phase_user_score
BEFORE INSERT OR UPDATE ON "PhaseUser"
FOR EACH ROW
EXECUTE FUNCTION validate_score();