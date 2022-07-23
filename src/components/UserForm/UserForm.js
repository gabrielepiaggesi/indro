import React, { useContext, useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import '../../global.css';
import classes from './UserForm.module.css';
import AppContext from '../../store/app-context';
import { useNavigate, useParams } from 'react-router-dom';
import { createUserApplication, getJobOfferUserApplication, getJobOfferUserData } from '../../lib/api';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import { userDataConfig } from './userDataConfig';

const UserForm = (props) => {
    const [dataInputs, setDataInputs] = useState(undefined);
    const [skills, setSkills] = useState(undefined);
    const ctx = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => getJobForm(), []);

    const getJobForm = () => {
        console.log(ctx.companyId);
        setIsLoading(true);
        getJobOfferUserApplication(ctx.jobOfferId, ctx.userDetails.user.id)
        .then(data => {
            getJobData(data.dataOptions);
            setSkills(data.jobOfferSkills.sort((a, b) => b.required - a.required));
        })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    }

    const getJobData = (userData) => {
        getJobOfferUserData(ctx.jobOfferId)
        .then(jobData => transformUserDataToInputs(userData, jobData))
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let dto = {
            uApp: { 
                company_id: ctx.companyId,
                job_offer_id: +ctx.jobOfferId
            },
            uData: dataInputs.filter(opt => opt.type !== 'FILE').map((option) => {
                let obj = {
                    job_offer_id: ctx.jobOfferId,
                    user_data_option_id: option.id,
                };
                if (['STRING', 'DATE'].includes(option.type)) {
                    obj['string_value'] = event.target.elements[option.option_key].value;
                }
                if (['NUMBER'].includes(option.type)) {
                    obj['number_value'] = +event.target.elements[option.option_key].value;
                }
                if (['BOOLEAN'].includes(option.type)) {
                    obj['number_value'] = event.target.elements[option.option_key].checked ? 1 : 0;
                }
                return obj;
            }),
            uSkills: skills.map(skill => {
                let obj = {
                    job_offer_id: ctx.jobOfferId,
                    job_offer_skill_id: skill.id,
                    confidence_level: +event.target.elements['level_skill_'+skill.id].value,
                    years: +event.target.elements['years_skill_'+skill.id].value
                }
                return obj;
            })
        }
        const fileInputs = dataInputs.filter(opt => opt.type === 'FILE');
        fileInputs.forEach(fil => {
            dto[fil.option_key] = event.target.elements[fil.option_key] ? 
            event.target.elements[fil.option_key].files[0] || null : null;
        });
        console.log(dto);

        setIsLoading(true);
        createUserApplication(dto)
        .then(data => {
            navigate(`/quizList`, {replace: true});
        })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    };

    const transformUserDataToInputs = (userData, jobData) => {
        let data = userData.filter(uD => !!(jobData.find(jD => jD.option_id === uD.id)));
        console.log(data);
        data = data.map(d => {
            return {
                ...d,
                form: userDataConfig[d.option_key]
            }
        });
        setDataInputs(data);
        setIsLoading(false); 
    }

    if (isLoading || !dataInputs) return (<div className="flex fCenter"><LoadingSpinner /></div>);

    return (
        <Card className="pad15 w50 mAuto">
            <p className={classes.title}>Completa le tue informazioni</p>
            <form className="flex fColumn gap40" onSubmit={onSubmitHandler}>
                {dataInputs.map((info) => 

                    (info.form.type === "checkbox") ? 
                    <div key={info.option_key} className="flex fRow aCenter gap15">
                        <input 
                                className={`pad15 br5  ${classes.checkInput}`}
                                type={info.form.type} 
                                name={info.option_key} 
                                placeholder={info.form.placeholder}
                            />
                        <label>{info.form.label}</label>
                    </div>
                    :
                    <div key={info.option_key} className="flex fColumn gap15">
                        <label>{info.form.label}</label>
                        <input className="pad15 br5 brC" type={info.form.type} name={info.option_key} placeholder={info.form.placeholder} />
                    </div>
                )}


                <div className='flex fColumn gap20'>
                    <p className={classes.title}>Per ogni competenza indica il tuo livello e la tua esperienza in anni.</p>

                    {skills.map((skill) => 
                        <div key={skill.id} className="flex fColumn gap10">
                            <label>{skill.text} {skill.required === 1 ? '' : ' - (Competenza Facoltativa)'}</label>
                            <div className='flex fRow gap10'>
                                <select className="pad15 br5 f1 brC" name={"level_skill_"+skill.id}>
                                    <option value={3}>Principiante</option>
                                    <option value={5}>Junior</option>
                                    <option value={8}>Senior</option>
                                    <option value={13}>Esperto/a</option>
                                </select>
                                <select className="pad15 br5 f1 brC" name={"years_skill_"+skill.id}>
                                    <option value={1}>1 Anno</option>
                                    <option value={2}>2 Anni</option>
                                    <option value={3}>3 Anni</option>
                                    <option value={4}>4 Anni</option>
                                    <option value={5}>5 Anni</option>
                                    <option value={6}>6 Anni</option>
                                    <option value={7}>7+ Anni</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
                <Button type="submit" className="fBold">INVIA</Button>
            </form>
        </Card>
    );
};

export default UserForm;