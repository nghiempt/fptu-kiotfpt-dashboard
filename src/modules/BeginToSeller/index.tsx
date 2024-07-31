import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import { ROUTE } from '../../routes/constant';
import { AuthService } from '../../services/auth';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import { ShopService } from '../../services/shop';
import {
    StepTitle,
    StepGroup,
    StepContent,
    Step,
} from 'semantic-ui-react'

const BeginToSellerContainer: React.FC = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accountID, setAccountID] = useState(0);

    const [shopName, setShopName] = useState("");
    const [shopPhone, setShopPhone] = useState("");

    const handleSubmit = async () => {
        if (!username || !password) {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Sign In',
                description: 'Username or password is empty',
                time: 1000,
            });
            return;
        }
        setLoading(true);
        const payload = {
            password: password,
            username: username,
            retypePassword: password,
        };
        const res = await AuthService.signUp(payload);
        if (res) {
            setLoading(false);
            setAccountID(res?.id);
            setStep(1);
        } else {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Error',
                description: 'Sign up failed',
                time: 1000,
            });
            setLoading(false);
        }
    }

    const handleCreateShop = async () => {
        if (!shopName || !shopPhone) {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Validate',
                description: 'Shop Name or Shop Phone is empty',
                time: 1000,
            });
            return;
        }
        setLoading(true);
        const payload = {
            account_id: accountID,
            email: username,
            name: shopName,
            phone: shopPhone,
            thumbnail: "empty"
        }
        const res = await ShopService.createShop(payload);
        if (res) {
            setLoading(false);
            setStep(1);
            toast({
                type: 'success',
                icon: 'sync',
                title: 'Success',
                description: res?.message,
                time: 1000,
            });
            navigate(ROUTE.SIGN_IN);
        } else {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Error',
                description: 'Create shop failed',
                time: 1000,
            });
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-screen bg-[rgb(247,247,247)]'>
            <div className='w-full flex justify-center items-center relative'>
                <SemanticToastContainer className="w-1/5 absolute top-10" />
            </div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center' className='flex justify-center items-center gap-4 !text-[rgb(133,154,194)]'>
                        <Image className='rounded-full' src='https://res.cloudinary.com/kiotfpt/image/upload/v1722159749/kiotfpt/logo_jniyaz.png' />
                        <div className="text-gray-700 self-center text-xl font-bold sm:text-2xl whitespace-nowrap">BEGIN TO SELLER</div>
                    </Header>
                    <StepGroup ordered>
                        <Step completed={step === 1 ? true : false}>
                            <StepContent>
                                <StepTitle>Sign Up Acocunt</StepTitle>
                            </StepContent>
                        </Step>
                        <Step completed={step === 2 ? true : false}>
                            <StepContent>
                                <StepTitle>Create Shop</StepTitle>
                            </StepContent>
                        </Step>
                    </StepGroup>
                    {
                        step === 0
                            ?
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Username'
                                        type='text'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className='mb-4'>Please sign up one account to continue</div>
                                    <Button
                                        className='!bg-[rgb(3,52,110)] !text-white hover:opacity-80'
                                        fluid size='large'
                                        loading={loading}
                                        onClick={handleSubmit}
                                    >
                                        Continue
                                    </Button>
                                </Segment>
                            </Form>
                            :
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        icon='shopping bag'
                                        iconPosition='left'
                                        placeholder='Shop Name'
                                        type='text'
                                        value={shopName}
                                        onChange={(e) => setShopName(e.target.value)}
                                    />
                                    <Form.Input
                                        fluid
                                        icon='phone square'
                                        iconPosition='left'
                                        placeholder='Shop Phone'
                                        type='text'
                                        value={shopPhone}
                                        onChange={(e) => setShopPhone(e.target.value)}
                                    />
                                    <Button
                                        className='!bg-[rgb(3,52,110)] !text-white hover:opacity-80'
                                        fluid size='large'
                                        loading={loading}
                                        onClick={handleCreateShop}
                                    >
                                        Create
                                    </Button>
                                </Segment>
                            </Form>
                    }
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default BeginToSellerContainer
