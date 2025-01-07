# Byzantine Finance Take-Home Test

The original README.md explaining the challenge can be found [here](./docs/README.md), and the original codebase can be found [here](https://github.com/Byzantine-Finance/take-home-test).

## Testing locally 🛠️

To test locally, run the following commands:

1. **Clone or Fork:** 📥

   ```bash
   git clone https://github.com/Byzantine-Finance/take-home-test.git
   ```

2. **Install Dependencies:** 📦

   ```bash
   cd take-home-test
   npm install
   ```

3. **Run Locally:** 🚀

   ```bash
   npm run dev
   ```

   This starts the local development server on [http://localhost:3000](http://localhost:3000).

---

## TODOs ✅

To create a TODO.md file with the TODOs found in the codebase, run the following command:

```bash
npm run find-todos
```

This will create a TODO.md file in the root of the project with the TODOs found in the codebase.

View the TODO.md file [here](./TODO.md)

---

## Notes

### Architectural

* I've chosen to go with TailwindCSS for styling, as I find it to be a more modern and flexible approach to styling than the original codebase boilerplate's approach of using CSS modules. I believe it does a better job of providing consistency and theming, and a better prototyping experience being able to work directly in the markup. I've done a base-level job of integrating the two, which works well, but reworking the existing css was out of scope for this test.

* For the components I've added, I've make a distinction between the UI components (in the UI directory) and the app components. The distinction here is that UI components should be generic and not aware of the app's data/state, whereas app components should be aware of the app's data/state. This allows for more flexibility and reusability of UI components, as well as a clearer separation of concerns.

### Testing

* I strongly believe in TDD in general, especially with a long-term project in a shared codebase, however, e2e testing seemed out of scope for this challenge, and the value of unit/integration testing for this challenge was low given the simplicity of the logic.

### Exercise 1: Search

#### Thoughts

* The requested "search" isn't really a search like the examples in the suggested references, which allow the user to search to find something and then go to that item somewhere in the documentation or a separate page.

* This search is more of a filter, and given the relatively simple tabular data, a simple text filter makes the most sense. Offloading sorting to a future datagrid implementation would be really helpful for the UX, but out of scope for this test. A full-featured datagrid would allow for a lot of control over the UX, as well as more advanced sorting/filtering for tabular data like this.

* The keyboard shortcuts are a nice addition, and were added.

* A feature that I would have liked to add is some sort of advanced filter dialog (via an icon next to the search) that would allow the user to filter by ranges, as well as select/deselect the AVS included in the table. However, all things considered, this was out of scope for this test.

* Lastly, the color scheme needed to be adjusted, since the data was not readable against the background in the original codebase boilerplate.

#### Implemented features

* Basic case-insensitive text search against the vault name and address.

* Keyboard shortcuts for search: `/` to focus the search bar, `esc` to clear and unfocus the search bar.

#### Additional considerations

* The search assumes that there are not too many vaults. For a more robust solution, we could consider offloading the search to the backend with search parameters and a query. Implementing this would also allow for persistence and handling of pagination.

* One feature I would have liked to add is the ability to see the text of the search highlighted in the table, but this seemed out of scope for this test.

### Exercise 2: Vault interaction

#### Implemented features

* Wallet connect
* Restake/withdraw from vault
* Flip feature for restaking/withdrawing
* Gas fee estimation
* ETH/USD price pull/integration
* Refresh button + animation

#### Additional considerations/TODOs

* The wallet connect button and interface as an out-of-the-box solution, but should be replaced with custom components for a more consistent theme/UI, as well as more control over the UX.

* The interface for the exchange was largely unchanged because it was out of scope for this test.

* I've removed the "Reward rate" and "Validator activation" information, as well as the "Service fees" information, as they seemed out of scope for this test without more information/instruction.

* Lastly, the color scheme needed to be adjusted, since the values were not readable against the background in the original codebase boilerplate.

---

## To view the submission on Vercel

Deployed on Vercel [here](https://byzantine-finance-take-home-test.vercel.app/)
