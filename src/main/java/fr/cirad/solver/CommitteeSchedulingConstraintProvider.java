package fr.cirad.solver;

import java.util.List;
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;
import org.optaplanner.core.api.score.stream.Constraint;
import org.optaplanner.core.api.score.stream.ConstraintFactory;
import org.optaplanner.core.api.score.stream.ConstraintProvider;
import fr.cirad.domain.CommitteeAssignment;
import fr.cirad.domain.Skill;

import static org.optaplanner.core.api.score.stream.Joiners.equal;

public class CommitteeSchedulingConstraintProvider implements ConstraintProvider {

        @Override
        public Constraint[] defineConstraints(ConstraintFactory constraintFactory) {
                return new Constraint[] {selfConflict(constraintFactory),
                                committeeConflict(constraintFactory),
                                committeeAssignmentsConflict(constraintFactory),
                                requiredPersonType(constraintFactory),
                                requiredSkillsToCertificate(constraintFactory)};
        }

        private Constraint selfConflict(ConstraintFactory constraintFactory) {
                return constraintFactory.from(CommitteeAssignment.class).filter(
                                committeeAssignment -> committeeAssignment.assignedPerson.equals(
                                                committeeAssignment.committee.evaluatedPerson))
                                .penalize("A person cannot be assigned to its self committee",
                                                HardSoftScore.ONE_HARD);
        }

        private Constraint committeeConflict(ConstraintFactory constraintFactory) {
                return constraintFactory
                                .fromUniquePair(CommitteeAssignment.class,
                                                equal(CommitteeAssignment::getAssignedPerson))
                                .penalize("A person cannot be assigned multiple times to the same committee",
                                                HardSoftScore.ONE_HARD);
        }

        private Constraint committeeAssignmentsConflict(ConstraintFactory constraintFactory) {
                return constraintFactory.from(CommitteeAssignment.class).filter(
                                committeeAssignment -> (committeeAssignment.assignedPerson.assignments
                                                .size() > 3))
                                .penalize("Only three committee per person",
                                                HardSoftScore.ONE_HARD);
        }

        private Constraint requiredPersonType(ConstraintFactory constraintFactory) {
                return constraintFactory.from(CommitteeAssignment.class).filter(
                                committeeAssignment -> !committeeAssignment.assignedPerson.personType
                                                .equals(committeeAssignment.requiredPersonType))
                                .penalize("Required person type to certificate",
                                                HardSoftScore.ONE_HARD);
        }

        private Constraint requiredSkillsToCertificate(ConstraintFactory constraintFactory) {
                return constraintFactory.from(CommitteeAssignment.class)
                                .filter(committeeAssignment -> {
                                        List<Skill> skillsToCertificate =
                                                        committeeAssignment.committee.evaluatedPerson.skillsToCertificate;
                                        return !committeeAssignment.assignedPerson
                                                        .hasAtListOneSkill(skillsToCertificate);
                                })
                                .penalize("Required skills to certificate", HardSoftScore.ONE_HARD);
        }

}
