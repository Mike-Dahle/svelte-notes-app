<script lang='ts'>
import { Router, Route } from 'svelte-routing';

import Home from './Home/Home.svelte';
import Editing from './components/Editing.svelte';
import Viewing from './components/Viewing.svelte';
</script>

<main>
	<Router>
		<Route path='/'>
			<Home />
		</Route>
		<Route path='/edit/:id' let:params>
			<Editing id={params.id}/>
		</Route>
		<Route path='/view/:id' let:params>
			<Viewing id={params.id}/>
		</Route>
	</Router>
</main>