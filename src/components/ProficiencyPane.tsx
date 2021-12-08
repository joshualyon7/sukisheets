import React, { Dispatch } from 'react';
import '../css/ProficiencyPane.css';
import { Table } from 'react-bootstrap';
import { firstLetterCaps, makeSignedNumber } from '../utilities';
import { ICharInfo, ICharInfoAction } from '../types/CharInfo';
import { ESkill } from '../types/Skill';
// import { Stat } from '../types/StatInfo';

export function ProficiencyPane({ char, dispatch }: { char: ICharInfo, dispatch: Dispatch<ICharInfoAction> }) {
    function makeSkillBoxes(): JSX.Element[] {
        const boxArr: JSX.Element[] = [];

        char.abilities.forEach(ability => {
            ability.relevantSkills.forEach(skill => {
                boxArr.push(<SkillBox
                    key={skill}
                    ability={ability.name.toUpperCase()}
                    skill={skill}
                    modifier={ability.modifier}
                />);
            });
        });

        return boxArr;
    }

    function SkillBox({ability, skill, modifier}: {ability: string, skill: ESkill, modifier: number}) {
        console.log('rendering prof pane');

        return (
            <tr>
                <td><input
                    checked={char.proficiencies.includes(skill)}
                    value={skill}
                    type='checkbox'
                    onChange={handleProfToggle}/></td>
                <td>{ability.toUpperCase()}</td>
                <td>{firstLetterCaps(skill)}</td>
                <td>{makeSignedNumber(char.proficiencies.includes(skill) ? modifier + 2 : modifier)}</td>
            </tr>

        );
    }

    function handleProfToggle(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        console.log(`target.checked: ${target.checked}`);

        const action: ICharInfoAction = {
            type: `${target.checked ? 'add' : 'remove'}Proficiency`,
            payload: target.value
        };
        dispatch(action);
    }

    return (
        <div id='table-div'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Prof</th>
                        <th>Mod</th>
                        <th>Skill</th>
                        <th>Bonus</th>
                    </tr>
                </thead>
                <tbody>
                    {makeSkillBoxes()}
                </tbody>
            </Table>
        </div>
    );
}
