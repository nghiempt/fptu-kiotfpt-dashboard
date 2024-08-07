import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import { ROUTE } from '../../routes/constant';
import { AuthService } from '../../services/auth';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

const SignInContainer: React.FC = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
        const payload = {
            password: password,
            username: username
        };
        const res = await AuthService.signIn(payload);
        if (res) {
            if (res?.role === 'admin') {
                navigate(ROUTE.ADMIN);
            } else {
                navigate(ROUTE.SELLER);
            }
        } else {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Sign In',
                description: 'Sign in failed',
                time: 1000,
            });
        }
    }

    useEffect(() => {
        if (AuthService.getRole() === 'admin') {
            window.location.href = "/admin";
        } else if (AuthService.getRole() === 'shop') {
            window.location.href = "/seller";
        }
    }, [])

    return (
        <div className='w-full h-screen bg-[rgb(247,247,247)]'>
            <div className='w-full flex justify-center items-center'>
                <SemanticToastContainer className="w-1/5" />
            </div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center' className='flex justify-center items-center gap-4 !text-[rgb(133,154,194)]'>
                        <Image className='rounded-full' src='https://res.cloudinary.com/kiotfpt/image/upload/v1722159749/kiotfpt/logo_jniyaz.png' />
                        <div className="text-gray-700 self-center text-xl font-bold sm:text-2xl whitespace-nowrap">KIOTFPT DASHBOARD</div>
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                type='text'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button className='!bg-[rgb(3,52,110)] !text-white hover:opacity-80' fluid size='large' onClick={handleSubmit}>
                                Sign in
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default SignInContainer
