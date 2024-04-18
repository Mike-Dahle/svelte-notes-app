<script lang='ts'>
import { Router, Route } from 'svelte-routing';

import Home from './Home/Home.svelte';
</script>

<main>
	<Router>
		<Route path='/'>
			<Home />
		</Route>
		<Route path='/edit/:id' let:params>
			<h1>Edit</h1>
		</Route>
		<Route path='/view/:id' let:params>
			<h1>Page</h1>
		</Route>
	</Router>
</main>