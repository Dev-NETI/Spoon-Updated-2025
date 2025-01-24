import { Box } from '@mui/material';
import React from 'react';

function NutritionTab({ data }) {
    return (
        <Box>
            <div className='nutrion-facts'>
                <section className='performance-facts'>
                    <header className='performance-facts__header'>
                        <h1 className='performance-facts__title'>
                            Nutrition Facts
                        </h1>
                        {/* <p>Serving Size 1/2 cup (about 82g)</p> */}
                        <p>Number of serving/s: {data?.number_of_serving}</p>
                    </header>
                    <table className='performance-facts__table'>
                        <thead>
                            <tr>
                                <th colSpan='3' className='small-info'>
                                    Amount Per Serving
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th colSpan='2'>
                                    <b>Calories</b> {data?.calories}
                                </th>
                                <td>{/* Calories from Fat 130 */}</td>
                            </tr>
                            <tr className='thick-row'>
                                <td colSpan='3' className='small-info'>
                                    <b>% Daily Value*</b>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan='2'>
                                    <b>Total Fat</b> {data?.fat}g
                                </th>
                                <td>
                                    <b>{/* 22% */}</b>
                                </td>
                            </tr>
                            {/* <tr>
                                <td className='blank-cell'></td>
                                <th>Saturated Fat 9g</th>
                                <td>
                                    <b>22%</b>
                                </td>
                            </tr> */}
                            {/* <tr>
                                <td className='blank-cell'></td>
                                <th>Trans Fat 0g</th>
                                <td></td>
                            </tr> */}
                            {/* <tr>
                                <th colSpan='2'>
                                    <b>Cholesterol</b> 55mg
                                </th>
                                <td>
                                    <b>18%</b>
                                </td>
                            </tr> */}
                            <tr>
                                <th colSpan='2'>
                                    <b>Sodium</b> {data?.sodium}mg
                                </th>
                                <td>{/* <b>2%</b> */}</td>
                            </tr>
                            <tr>
                                <th colSpan='2'>
                                    <b>Total Carbohydrate</b>{' '}
                                    {data?.carbohydrate}g
                                </th>
                                <td>{/* <b>6%</b> */}</td>
                            </tr>
                            <tr>
                                <td className='blank-cell' />
                                <th>Dietary Fiber {data?.fiber}g</th>
                                <td>{/* <b>4%</b> */}</td>
                            </tr>
                            {/* <tr>
                                <td className='blank-cell'></td>
                                <th>Sugars 14g</th>
                                <td></td>
                            </tr> */}
                            <tr className='thick-end'>
                                <th colSpan='2'>
                                    <b>Protein</b> {data?.protein}g
                                </th>
                                <td />
                            </tr>
                        </tbody>
                    </table>
                    {/* <table className='performance-facts__table--grid'>
                        <tbody>
                            <tr>
                                <td colSpan='2'>Vitamin A 10%</td>
                                <td>Vitamin C 0%</td>
                            </tr>
                            <tr className='thin-end'>
                                <td colSpan='2'>Calcium 10%</td>
                                <td>Iron 6%</td>
                            </tr>
                        </tbody>
                    </table> */}
                    <p className='small-info'>
                        * Percent Daily Values are based on a 2,000 calorie
                        diet. Your daily values may be higher or lower depending
                        on your calorie needs:
                    </p>
                </section>
            </div>
        </Box>
    );
}

export default NutritionTab;
