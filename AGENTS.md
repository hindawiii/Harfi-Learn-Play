<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Speech lifecycle
- All learning sections delegate speech and cancellation to SpeechSystem sessions; sessions own timers and synchronous cleanup so stale callbacks cannot mutate newer playback.
- Sequential counting uses the shared readSequence API rather than accessing speech session internals, ensuring the same cancellation and completion rules everywhere.
