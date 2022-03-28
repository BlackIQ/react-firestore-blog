const Index = () => {

    const react = <span className='text-info'>ReactJs</span>;
    const firebase = <span className='text-warning'>Firebase</span>;

    const name = <span>{firebase}{react}</span>;

    return (
        <div className='m-5 p-5'>
            <h1>Welcome to {name}.</h1>
            <br/>
            <h3>What is {name}?</h3>
            <p><li>{name} is an application for learning how to integrate {react} and {firebase}.</li></p>
            <br/>
            <br/>
            <b>For more information check the application README located in Github.</b>
        </div>
    );
}

export default Index;
